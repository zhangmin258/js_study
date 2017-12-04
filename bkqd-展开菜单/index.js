






$(function(){

		//下拉菜单
		$('.member').hover(function(){
			$('.member_ul').show().animate({
				step: 10,
				t: 50,
				mul: {
					height: 120,
					o: 100
				}
			});
		},function(){
			$('.member_ul').animate({
				step: 10,
				t: 50,
				mul: {
					height: 0,
					o: 0
				}
			});
		});


		//登录框
		
		var login = $('#login');
		var screen = $('#screen');
		
		login.center(350,250).resize(function(){
			if(login.css('display') == 'block'){
				screen.lock();
			}
		});

		
		//点击登录按钮弹出登录框
		$('.login').click(function(){
			login.show().center(350,250);
			screen.lock().animate({
				attr: 'o',
				target: 30,
			});
		});

		//点击关闭按钮
		$('.close').click(function(){
			login.hide();
			screen.animate({
				attr: 'o',
				target: 0,
				fn: function(){
					screen.unlock();
				}
			});
		});


		//拖拽
		login.drag($('#login h2').first());


		//百度分享侧栏
		$('#share').css('top',getScroll().top + (getInner().height-parseInt(getStyle($('#share').first(),'height')))/2 + 'px');   //居中
		addEvent(window,'scroll',function(){
			$('#share').animate({
				attr: 'y',
				target: getScroll().top + (getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
			});
		});
		
		$('#share').hover(function(){
			$(this).animate({
				attr: 'x',
				target: 0
			});
		},function(){
			$(this).animate({
				attr: 'x',
				target: -211
			});
		});









		$('#box').click(function(){
			$(this).animate({
				step: 10,
				t: 50,
				attr: 'x',
				target: 300,
				mul: {
					w: 101,
					h: 300,
					o: 30
				},
				fn: function(){
					alert(123);
				}
			});
		});











});

	














	






















