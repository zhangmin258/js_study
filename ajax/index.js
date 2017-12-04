







function createXHR(){
	if(typeof XMLHttpRequest != 'undefined'){
		return new XMLHttpRequest();
	}else if(typeof ActiveXObject != 'undefined'){
		var version = [
			'MSXML2.XMLHttp6.0',
			'MSXML2.XMLHttp3.0',
			'MSXML2.XMLHttp'
		];
		for(var i=0;i<version.length;i++){
			try{
				return new ActiveXObject(version[i]);
			}catch(e){
				//跳过
			}
		}
	}else{
		throw new Error('您的浏览器不支持XHR对象！');
	}
}


 
//使用同步方式
// addEvent(document,'click',function(){
// 	var xhr = createXHR();  //创建XHR对象
// 	xhr.open('get','demo1.php?rander:'+Math.random(),false);    // 启动请求，准备发送            false:同步    true:异步
// 	xhr.send(null);   //发送请求，get不需要数据提交，则填写为null

// 	// alert(xhr.responseText);   //2017-05-10 11:11:57
// 	// alert(xhr.status);
// 	if(xhr.status == 200){
// 		alert(xhr.responseText);
// 	}else{
// 		alert(xhr.statusText);
// 	}

// });


//使用异步方式
// addEvent(document,'click',function(){
// 	var xhr = createXHR();

// 	xhr.onreadystatechange = function(){
// 		if(xhr.readyState == 4){
// 			if(xhr.status == 200){
// 				alert(xhr.responseText);
// 			}else{
// 				alert(xhr.statusText);
// 			}
// 		}
		
// 	}

// 	xhr.open('get','demo.php?rand='+Math.random(),true);
// 	xhr.send(null);
// 	// xhr.abort();   //取消异步请求

// });
// 


//对象(名值对转换成字符窜)
function params(data){
	var arr = [];
	for(var i in data){
		arr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]));
	}
	return(arr.join('&'));
}


//封装ajax
function ajax(obj){
	var xhr = createXHR();   //创建本地XHR对象
	obj.url = obj.url + '?rand=' + Math.random();
	obj.data = params(obj.data);
	if(obj.method == 'get'){
		obj.url = obj.url.indexOf('?') == -1 ? obj.url +'?'+ obj.data : obj.url +'&'+ obj.data;
	}
	if(obj.async === true){    //异步
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				callback();
			}
		}
	}
	
	xhr.open(obj.method,obj.url,obj.async);
	if(obj.method == 'post'){
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(obj.data);
	}else{
		xhr.send(null);
	}
	
	if(obj.async === false){    //同步
		callback();
	}

	function callback(){
		if(xhr.status == 200){
			obj.success(xhr.responseText);
		}else{
			alert('获取数据错误！错误代号：' + xhr.status + '；错误信息：' + xhr.statusText);
		}
	}
}



//执行ajax
addEvent(document,'click',function(){
	ajax({
		method: 'get',
		url: 'demo.php',
		data: {
			'name': 'Lee',
			'age': 100
		},
		async: true,
		success: function(res){
			alert(res);
		}
	});
});






















































