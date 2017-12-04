






// $(function(){

// 		//下拉菜单
// 		$('.member').hover(function(){
// 			$('.member_ul').show();
// 		},function(){
// 			$('.member_ul').hide();
// 		});


// 		//登录框
		
// 		var login = $('#login');
// 		var screen = $('#screen');
		
// 		login.center(350,250).resize(function(){
// 			if(login.css('display') == 'block'){
// 				screen.lock();
// 			}
// 		});

		
// 		//点击登录按钮弹出登录框
// 		$('.login').click(function(){
// 			screen.lock();
// 			login.show().center(350,250);
// 		});

// 		//点击关闭按钮
// 		$('.close').click(function(){
// 			screen.unlock();
// 			login.hide();
// 		});


// 		//拖拽
// 		login.drag($('#login h2').first());

	
// });

	





$(function(){

	$('#start').click(function(){
		$('#box').animate({
			'attr': 'x',
			// 'target': 300,
			'alert': 200
		});
	});
	


});









	






















