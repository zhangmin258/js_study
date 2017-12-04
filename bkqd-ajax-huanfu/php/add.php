


<?php

	sleep(3);   //3秒后执行

	require 'config.php';     //连接数据库

	$_birthday = $_POST['year'].'-'.$_POST['month'].'-'.$_POST['day'];

	$query = "INSERT INTO blog_user (user,pass,question,answer,email,birthday,ps) VALUES ('{$_POST['user']}',sha1('{$_POST['pass']}'),'{$_POST['question']}','{$_POST['answer']}','{$_POST['email']}','{$_birthday}','{$_POST['ps']}')";

	mysql_query($query)or die('新增失败！'.mysql_error());

	echo mysql_affected_rows();  //新增注册的条数

	mysql_close();







?>





































