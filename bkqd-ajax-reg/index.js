






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
		$('#login .close').click(function(){
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
		
		$(window).bind('scroll',function(){
			setTimeout(function(){    //解决每次拉动滚动条出现抖动的问题
				$('#share').animate({
					attr: 'y',
					target: getScroll().top + (getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
				});
			},100);
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


		//滑动导航
		$('#nav .about li').hover(function(){
			var target = $(this).first().offsetLeft;
			$('#nav .nav_bg').animate({
				attr: 'x',
				target: target + 20,
				fn: function(){
					$('#nav .white').animate({
						attr: 'x',
						target: -target,
						step: 10,
						t: 20
					});
				}
			});
		},function(){
			$('#nav .nav_bg').animate({
				attr: 'x',
				target: 20,
				fn: function(){
					$('#nav .white').animate({
						attr: 'x',
						target: 0,
						step: 10,
						t: 20
					});
				}
			});
		});



		//菜单切换
		$('#sideBar h2').toggle(function(){
			$(this).next().animate({
				mul: {
					'h': 0,
					'o': 0
				}
			});
		},function(){
			$(this).next().animate({
				mul: {
					'h': 150,
					'o': 100
				}
			});
		});



		//注册验证

		//点击注册按钮弹出注册框
		var reg = $('#reg');
		$('.reg').click(function(){
			reg.show().center(600,550);
			screen.lock().animate({
				attr: 'o',
				target: 30
			});
		});

		//点击关闭按钮隐藏注册框 
		$('#reg .close').click(function(){
			reg.hide();
			screen.animate({
				attr: 'o',
				target: 0,
				fn: function(){
					screen.unlock();
				}
			});
		});

		//改变浏览器窗口大小，使其总是保持居中
		reg.center(600,550).resize(function(){
			if(reg.css('display') == 'block'){
				screen.lock();
			}
		});

		//拖拽
		reg.drag($('#reg h2').first());



		//表单验证
		
		//每次刷新页面的时候，重置表单
		$('form').first().reset();

		
		//用户名验证
		$('form').form('user').bind('focus',function(){
			$('.info_user').show();
			$('.error_user').hide();
			$('.success_user').hide();
		}).bind('blur',function(){
			if(trim($(this).value()) == ''){
				$('.info_user').hide();
				$('.error_user').hide();
				$('.success_user').hide();
			}else if(!check_user()){
				$('.error_user').show();
				$('.info_user').hide();
				$('.success_user').hide();
			}else{
				$('.success_user').show();
				$('.error_user').hide();
				$('.info_user').hide();
			}
		});

		function check_user(){
			var flag = true;
			if(!/[\w]{2,20}/.test(trim($('form').form('user').value()))){
				$('.error_user').html('输入不合法，请重新输入！');
				return false;
			}else{
				$('.info_user').hide();
				$('#reg .loading').show();
				ajax({
					method: 'post',
					url: 'php/is_user.php',
					data: $('form').eq(0).serialize(),
					async: false,
					success: function(res){
						if(res == 1){
							$('.error_user').html('用户名被占用！');
							flag = false;
						}else{
							flag = true;
						}
						$('#reg .loading').hide();
					}
				});
			}
			return flag;
		}





		//密码验证
		$('form').form('pass').bind('focus',function(){
			$('.info_pass').show();
			$('.error_pass').hide();
			$('.success_pass').hide();
		}).bind('blur',function(){
			if(trim($(this).value()) == ''){
				$('.info_pass').hide();
				$('.error_pass').hide();
				$('.success_pass').hide();
			}else if(check_pass() == true){
				$('.info_pass').hide();
				$('.error_pass').hide();
				$('.success_pass').show();
			}else{
				$('.info_pass').hide();
				$('.error_pass').show();
				$('.success_pass').hide();
			}
		});


		//密码强度验证
		$('form').form('pass').bind('keyup',function(){

			check_pass();

		});


		//密码验证函数
		function check_pass(){

			var value = trim($('form').form('pass').value());
			var value_length = value.length;
			var code_length = 0;

			//第一个必须条件：6-20位之间(包括6位和20位)
			if(value_length >= 6 && value_length <= 20){
				$('.info_pass .q1').html('●').css('color','green');
			}else{
				$('.info_pass .q1').html('○').css('color','#666');
			}

			//第二个必须条件：只能包含大小写字母、数字和非空格字符(任意一个就满足)
			if(value_length > 0 && !/\s/.test(value)){
				$('.info_pass .q2').html('●').css('color','green');
			}else{
				$('.info_pass .q2').html('○').css('color','#666');
			}

			//第三个必须条件：大、小写字母、数字、非空字符，2种以上
			if(/[\d]/.test(value)){
				code_length ++;
			}
			
			if(/[a-z]/.test(value)){
				code_length ++;
			}

			if(/[A-Z]/.test(value)){
				code_length ++;
			}

			if(/[^\w]/.test(value)){
				code_length ++;
			}

			if(code_length >= 2){
				$('.info_pass .q3').html('●').css('color','green');
			}else{
				$('.info_pass .q3').html('○').css('color','#666');
			}


			//安全级别验证(从高到低级别判断)
			
			if(value_length >= 10 && code_length >= 3){         //高级别：大于等于10个字符，3种不同类别的字符混拼
				$('.info_pass .s').css('color','green');
				$('.info_pass .s4').html('高');
			}else if(value_length >= 8 && code_length >= 2){   //中级别：大于等于8个字符，2种不同类别的字符混拼
				$('.info_pass .s1').css('color','#f60');
				$('.info_pass .s2').css('color','#f60');
				$('.info_pass .s3').css('color','#999');
				$('.info_pass .s4').html('中').css('color','#f60');
			}else if(value_length >= 1){                      //低级别：大于等于1个字符
				$('.info_pass .s1').css('color','maroon');
				$('.info_pass .s2').css('color','#999');
				$('.info_pass .s3').css('color','#999');
				$('.info_pass .s4').html('低').css('color','maroon');
			}else{
				$('.info_pass .s').css('color','#999');
				$('.info_pass .s4').html('');
			}

			if(value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length >= 2){
				return true;
			}else{
				return false;
			}

			
		}


		//确认密码验证
		$('form').form('notpass').bind('focus',function(){
			$('.info_notpass').show();
			$('.error_notpass').hide();
			$('.success_notpass').hide();
		}).bind('blur',function(){
			
			if(trim($(this).value()) == ''){
				$('.info_notpass').hide();
			}else if(check_notpass()){
				$('.info_notpass').hide();
				$('.error_notpass').hide();
				$('.success_notpass').show();
			}else{
				$('.info_notpass').hide();
				$('.error_notpass').show();
				$('.success_notpass').hide();
			}
		});


		function check_notpass(){
			var pass_value = trim($('form').form('pass').value());
			var notpass_value = trim($('form').form('notpass').value());
			if(notpass_value == pass_value) return true;
		}


		//提问
		$('form').form('question').bind('change',function(){
			if(check_question()){
				$('.error_question').hide();
			}
		});


		//提问验证
		function check_question(){
			if($('form').form('question').value() != 0) return true;
		}


		//回答验证
		$('form').form('answer').bind('focus',function(){
			$('.info_answer').show();
			$('.error_answer').hide();
			$('.success_answer').hide();
		}).bind('blur',function(){
			if(trim($(this).value()) == ''){
				$('.info_answer').hide();
			}else if(check_answer()){
				$('.info_answer').hide();
				$('.error_answer').hide();
				$('.success_answer').show();
			}else{
				$('.info_answer').hide();
				$('.error_answer').show();
				$('.success_answer').hide();
			}
		});

		function check_answer(){
			if(trim($('form').form('answer').value()).length >= 2 && trim($('form').form('answer').value()).length <= 32) return true;
		}




		//电子邮件验证
		$('form').form('email').bind('focus',function(){
			$('.info_email').show();

			if($(this).value().indexOf('@') == -1){
				$('.all_email').show();
			}
			
			$('.error_email').hide();
			$('.success_email').hide();
		}).bind('blur',function(){
			if(trim($(this).value()) == ''){
				$('.info_email').hide();
				$('.all_email').hide();
			}else if(check_email()){
				$('.info_email').hide();
				$('.error_email').hide();
				$('.success_email').show();
			}else{
				$('.info_email').hide();
				$('.error_email').show();
				$('.success_email').hide();
			}
			
		});


		function check_email(){
			if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').form('email').value()))) return true;
		}


		//电子邮件自动补全
		$('form').form('email').bind('keyup',function(e){
			if($(this).value().indexOf('@') == -1){
				$('.all_email').show();
				$('.all_email li span').html($(this).value());
			}else{
				$('.all_email').hide();
			}


			var length = $('.all_email li').length();

			//当按了下键的时候
			if(e.keyCode == 40){
				if(this.index == undefined || this.index >= length - 1){
					this.index = 0;
				}else{
					this.index ++;
				}

				$('.all_email li').css('background','#fff').css('color','#666');
				$('.all_email li').eq(this.index).css('background','#e5edf2').css('color','#369');
			}

			//当按了上键的时候
			if(e.keyCode == 38){
				if(this.index == undefined || this.index <= 0){
					this.index = length - 1;
				}else{
					this.index --;
				}

				$('.all_email li').css('background','#fff').css('color','#666');
				$('.all_email li').eq(this.index).css('background','#e5edf2').css('color','#369');
			}

			//当按了回车键的时候
			if(e.keyCode == 13){
				$(this).value($('.all_email li').eq(this.index).text());
				$('.all_email').hide();
				this.index = undefined;    //初始化
			}
			
		});


		//电子邮件补全系统点击获取
		$('.all_email li').bind('mousedown',function(){
			$('form').form('email').value($(this).text());
			$('.all_email').hide();
		});


		//年、月、日验证
		var year = $('.year');
		var month = $('.month');
		var day = $('.day');

		var day30 = [4,6,9,11];
		var day31 = [1,3,5,7,8,10,12];

		// 注入年份
		for(var i=1950;i<=2050;i++){
			year.first().add(new Option(i,i),undefined);
		}
		
		//注入月份
		for(var i=1;i<=12;i++){
			month.first().add(new Option(i,i),undefined);
		}


		
		year.bind('change',select_day);

		month.bind('change',select_day);

		day.bind('change',function(){
			if(check_bir()){
				$('.error_bir').hide();
			}
		});



		//年月日验证函数
		function check_bir(){
			if(year.value() != 0 && month.value() != 0 && day.value() != 0) return true;
		}


		//注入日函数
		function select_day(){


			if(year.value() != 0 && month.value() != 0){

				//清理之前的注入
				day.first().options.length = 1;

				//不确定的日
				var cur_day = 0;

				//注入日
				if(inArray(day31,parseInt(month.value()))){
					cur_day = 31;
				}else if(inArray(day30,parseInt(month.value()))){
					cur_day = 30;
				}else{
					//2月份只有28天或者是29天，如果该年为闰年，那么只有29天，否则为28天
					if((parseInt(year.value()) % 4 == 0 && parseInt(year.value()) % 100 != 0) || (parseInt(year.value()) % 400 == 0)){
						cur_day = 29;
					}else{
						cur_day = 28;
					}
				}

				for(var i=1;i<=cur_day;i++){
					day.first().add(new Option(i,i),undefined);
				}


			}else{

				//清理之前的注入
				day.first().options.length = 1;
			}
		}


		//备注验证
		$('form').form('ps').bind('keyup',function(){
			check_ps();
		});


		//清尾
		$('#reg .clear').click(function(){
			var val = $('form').form('ps').value().substring(0,200);
			$('form').form('ps').value(val);
			check_ps();
		});


		function check_ps(){
			var num = 200 - $('form').form('ps').value().length;
			if(num >= 0){
				$('#reg .sr').show();
				$('#reg .cg').hide();
				$('#reg .sr strong').html(num);
				return true;
			}else{
				$('#reg .sr').hide();
				$('#reg .cg').show();
				$('#reg .cg strong').html(Math.abs(num));
				return false;
			}
		}



		//提交
		$('form').form('sub').click(function(){
			var flag = true;

			//用户名验证
			if(!check_user()){
				flag = false;
				$('.error_user').show();
			}

			//密码验证
			if(!check_pass()){
				flag = false;
				$('.error_pass').show();
			}

			//确认密码验证
			if(!check_notpass()){
				flag = false;
				$('.error_notpass').show();
			}

			//提问验证
			if(!check_question()){
				flag = false;
				$('.error_question').show();
			}

			//回答验证
			if(!check_answer()){
				flag = false;
				$('.error_answer').show();
			}

			//电子邮件验证
			if(!check_email()){
				flag = false;
				$('.error_email').show();
			}

			//年月日验证
			if(!check_bir()){
				flag = false;
				$('.error_bir').show();
			}

			//备注验证
			if(!check_ps ()){
				flag = false;
			}

			if(flag){   //如果全部都验证完毕，提交表单
				var _this = this;
				$('#loading').center(200,40).show();
				$('#loading p').html('数据提交中，请稍后！');
				this.disabled = true;
				$(this).css('background','url(images/reg.png) no-repeat right');
				ajax({
					method: 'post',
					url: 'php/add.php',
					data: $('form').eq(0).serialize(),
					success: function(res){
						if(res == 1){
							$('#loading').hide();
							$('#success').center(200,40).show();
							$('#success p').html('注册成功，请登录！');
							setTimeout(function(){
								$('#success').hide();
								$('#reg').hide();
								$('#reg').first().reset();
								$('#reg .success').hide();
								_this.disabled = false;
								$(_this).css('background','url(images/reg.png) no-repeat left');
								screen.animate({
									attr: 'o',
									target: 0,
									fn: function(){
										screen.unlock();
									}
								});
							},2000);
						}
					},
					async: true    //异步请求
				});
			}

			
		});


		















































		//轮播图初始化
		// $('#banner img').hide();
		// $('#banner img').eq(0).show();
		$('#banner img').opacity(0);
		$('#banner img').eq(0).opacity(100);

		$('#banner ul li').css('background','#fff');
		$('#banner ul li').eq(0).css('background','#f90');
		$('banner em').html($('#banner img').eq(0).attr('alt'));


		//轮播图计数器
		var banner_index = 1;

		//轮播图的种类
		var banner_type = 2;    // 1：表示透明度；2：上下滚动；3：左右滚动

		//自动轮播图
		var timer = setInterval(banner_fn,2000);
			

		//手动轮播图
		$('#banner ul li').hover(function(){
			if($(this).css('background') != 'rgb(255,153,0)' && $(this).css('background') != '#f90'){
				banner(this,banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
			}
			
			clearInterval(timer);
		},function(){
			banner_index = $(this).index() + 1;
			timer = setInterval(banner_fn,1000);
		});


		function banner(obj,prev){
			$('#banner ul li').css('background','#fff');
			$(obj).css('background','#f90');
			$('#banner em').html($('#banner img').eq($(obj).index()).attr('alt'));
			
			if(banner_type == 1){   //透明度轮播
				$('#banner img').eq(prev).animate({
					attr: 'o',
					target: 0
				}).css('zIndex','1');

				$('#banner img').eq($(obj).index()).animate({
					attr: 'o',
					target: 100
				}).css('zIndex','2');
			}else if(banner_type == 2){   //上下滚动轮播
				$('#banner img').eq(prev).animate({
					attr: 'y',
					target: 150
				}).css('zIndex','1').opacity(100);

				$('#banner img').eq($(obj).index()).animate({
					attr: 'y',
					target: 0
				}).css('zIndex','2').css('top','-150px').opacity(100);
			}else if(banner_type == 3){     //左右滚动轮播
				$('#banner img').eq(prev).animate({
					attr: 'x',
					target: -900
				}).css('zIndex','1').opacity(100);

				$('#banner img').eq($(obj).index()).animate({
					attr: 'x',
					target: 0
				}).css('zIndex','2').css('left','900px').opacity(100);
			}
			
		}


		function banner_fn(){
			if(banner_index >= $('#banner ul li').length()) banner_index = 0;
			banner($('#banner ul li').eq(banner_index).first(),banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
			banner_index ++;
		}


		//延迟加载
	
		//问题1：将图片的data_src地址替换成src地址
		//问题2：获取图片元素到最外层元素顶点的距离
		//问题3：获取页面可视区域的最低点的位置
		
		var wait_load = $('.wait_load');
		wait_load.opacity = 0;
		$(window).bind('scroll',_wait_load);   //拉动滚动条的时候需要执行
		$(window).bind('resize',_wait_load);	//改变浏览器窗口大小的时候需要执行

		function _wait_load(){
			setTimeout(function(){
				for(var i=0;i<wait_load.length();i++){
					var _this = wait_load.ge(i);

					if((getInner().height + getScroll().top) - (offsetTop(_this)) > 100){
						$(_this).attr('src',$(_this).attr('data-src')).animate({
							attr: 'o',
							target: 100
						});
					}
				}
			},100);
		}




		//预加载弹窗
		
		//点击图片弹出相册框
		var photo_big = $('#photo_big');

		$('#photo dl dt img').click(function(){
			photo_big.show().center(620,511);
			screen.lock().animate({
				attr: 'o',
				target: 30
			});

			//问题1：loading图片的样式被大图的样式覆盖了
			//问题2：动画的渐变效果没有出现
			//解决办法：创建一个临时的图片对象，用以保存图片

			var temp_img = new Image();   //创建一个临时区域的图片对象

			$(temp_img).bind('load',function(){
				$('#photo_big .big img').attr('src',temp_img.src).animate({
					attr: 'o',
					target: 100
				}).opacity(0).css('width','600px').css('height','450px').css('top','0');
			});
			
			//IE必须把src这个属性放到load事件的下面才有效
			temp_img.src = $(this).attr('bigsrc');    //src属性可以在后台加载这张图片到本地缓存




			var children = this.parentNode.parentNode;   //找到dl的节点
			prev_next_img(children);

			
		});



		//图片鼠标滑过
		$('#photo_big .big .left').hover(function(){
			$('#photo_big .big .sl').animate({
				attr: 'o',
				target: 70
			});
		},function(){
			$('#photo_big .big .sl').animate({
				attr: 'o',
				target: 0
			});
		});

		$('#photo_big .big .right').hover(function(){
			$('#photo_big .big .sr').animate({
				attr: 'o',
				target: 70
			});
		},function(){
			$('#photo_big .big .sr').animate({
				attr: 'o',
				target: 0
			});
		});

		

		//点击关闭按钮隐藏相册框 
		$('#photo_big .close').click(function(){
			photo_big.hide();
			screen.animate({
				attr: 'o',
				target: 0,
				fn: function(){
					screen.unlock();
				}
			});

			$('#photo_big .big img').attr('src','images/loading.gif').css('top','214px').css('width','32px').css('height','32px');
		});

		//改变浏览器窗口大小，使其总是保持居中
		photo_big.center(620,511).resize(function(){
			if(photo_big.css('display') == 'block'){
				screen.lock();
			}
		});

		//拖拽
		photo_big.drag($('#photo_big h2').first());


		
		// 图片上一张
		$('#photo_big .big .left').click(function(){
			$('#photo_big .big img').attr('src',$(this).attr('src')).animate({
				attr: 'o',
				target: 100,
			}).opacity(0);
			
			var children = $('#photo dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
			prev_next_img(children);

		});

		// 图片下一张
		$('#photo_big .big .right').click(function(){
			$('#photo_big .big img').attr('src',$(this).attr('src')).animate({
				attr: 'o',
				target: 100
			}).opacity(0);
			
			var children = $('#photo dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
			prev_next_img(children);

		});
		
		

		function prev_next_img(children){

			//该节点的上一个节点的索引值
			var prev = prevIndex($(children).index(),children.parentNode);   //传2个参数：1、当前节点的索引值；2、当前节点的父元素
			
			//该节点的下一个节点的索引值
			var next = nextIndex($(children).index(),children.parentNode);


			//创建2个临时的图片对象，用来储存上一张图片和下一张图片(先储存到本地缓存中)
			var prev_img = new Image();
			var next_img = new Image();
			prev_img.src = $('#photo dl dt img').eq(prev).attr('bigsrc');
			next_img.src = $('#photo dl dt img').eq(next).attr('bigsrc');

			$('#photo_big .big .left').attr('src',prev_img.src);
			$('#photo_big .big .right').attr('src',next_img.src);
			$('#photo_big .big img').attr('index',$(children).index());

			$('#photo_big .big .index').html($(children).index() + 1 + '/' + $('#photo dl dt img').length());

		}




});


	














	








































































































































































































































































