
<?php

	header('Content-Type:text/html; charset=utf-8');

	//常量参数
	define('DB_HOST','localhost');
	define('DB_USER','root');
	define('DB_NAME','blog');

	//连接mysql服务器
	$conn = @mysql_connect(DB_HOST,DB_USER)or die('数据库连接失败，错误信息：'+ mysql_error());

	//选择指定的数据库，设置字符集
	@mysql_select_db(DB_NAME)or die('数据库错误，错误信息：'+ mysql_error());
	@mysql_query('SET NAMES UTF8')or die('字符集设置错误，错误信息：'+ mysql_error());



?>































