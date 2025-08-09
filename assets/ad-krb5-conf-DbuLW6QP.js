const e=[{title:"Generate krb5.conf",description:"Kerberos configuration for realm and KDC settings (realm = uppercase domain).",template:`[domain_realm]
    .{domain} = {DOMAIN_UPPER}
    {domain} = {DOMAIN_UPPER}

[libdefaults]
    default_realm = {DOMAIN_UPPER}
    dns_lookup_realm = false
    dns_lookup_kdc = true
    ticket_lifetime = 24h
    forwardable = true

[realms]
    {DOMAIN_UPPER} = {
        kdc = {domain_controller}
        admin_server = {domain_controller}
        default_domain = {domain}
    }`},{title:"Get TGT with password (impacket-getTGT)",description:"Request a TGT using username and password, save to a Kerberos ccache file.",template:"impacket-getTGT {domain}/{username}:{password} -dc-ip {ip} -save {username}.ccache && export KRB5CCNAME={username}.ccache"},{title:"Get TGT with NTLM hash (impacket-getTGT)",description:"Request a TGT using username and NTLM hash without password.",template:"impacket-getTGT -no-pass -hashes :{ntlm_hash} {domain}/{username}@{domain_controller} -save {username}.ccache && export KRB5CCNAME={username}.ccache"}],a={commands:e};export{e as commands,a as default};
