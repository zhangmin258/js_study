







window.onload = function(){
	

	//下拉菜单
	$().getClass('member').hover(function(){
		$().getClass('member_ul').show();
	},function(){
		$().getClass('member_ul').hide();
	});


	//登录框
	
	var login = $().getId('login');
	
	login.center(350,250).resize(function(){
		login.center(350,250);
	});


	//点击登录按钮弹出登录框
	$().getClass('login').click(function(){
		login.show();
	});

	//点击关闭按钮
	$().getClass('close').click(function(){
		login.hide();
	});






}






































