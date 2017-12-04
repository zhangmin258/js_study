







window.onload = function(){
	

	//下拉菜单
	$().getClass('member').hover(function(){
		$().getClass('member_ul').show();
	},function(){
		$().getClass('member_ul').hide();
	});


	//登录框
	
	var login = $().getId('login');
	var screen = $().getId('screen');
	
	login.center(350,250).resize(function(){
		if(login.css('display') == 'block'){
			screen.lock();
		}
	});

	
	//点击登录按钮弹出登录框
	$().getClass('login').click(function(){
		screen.lock();
		login.show().center(350,250);
	});

	//点击关闭按钮
	$().getClass('close').click(function(){
		screen.unlock();
		login.hide();
	});


	//拖拽
	login.drag();



}






































