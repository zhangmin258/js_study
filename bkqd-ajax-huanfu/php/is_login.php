

<?php

	sleep(3);
	require 'config.php';


	$_pass = sha1($_POST['pass']);


	$query = mysql_query("SELECT user,pass FROM blog_user WHERE user='{$_POST['user']}' AND pass='{$_pass}'")or die('SQL错误！');

	if(mysql_fetch_array($query,MYSQL_ASSOC)){    //如果用户名和密码正确
		
		echo 0;
	}else{
		
		echo 1;
	}


	mysql_close();




?>































