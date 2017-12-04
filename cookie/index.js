






// alert(typeof document.cookie);   //string

//向本地磁盘写入cookie;
// document.cookie = 'user='+encodeURIComponent('张敏');
// alert(decodeURIComponent(document.cookie));



// alert(decodeURIComponent(document.cookie));



//声明过期时间
// var date = new Date();
// date.setDate(date.getDate() + 7);   //当过了这个时间点，cookie就被清理了
// document.cookie = 'user='+encodeURIComponent('张敏')+';expires='+date;
// alert(decodeURIComponent(document.cookie));





//设置cookie
function setCookie(name,value,expires,path,domain,secure){
	var cookieName = encodeURIComponent(name) +'='+ encodeURIComponent(value);
	if(expires instanceof Date){
		cookieName += ';expires' + expires;
	}
	if(path){
		cookieName += ';path' + path;
	}
	if(domain){
		cookieName += ';domain' + domain;
	}
	if(secure){
		cookieName += ';secure';
	}

	document.cookie = cookieName;
}



//过期时间 
function setCookieDate(day){    //传递一个过期时间，比如传递7，就表示7天后生效
	var date = null;
	if(typeof day == 'number' && day > 0){
		date = new Date();
		date.setDate(date.getDate() + day);
	}else{
		throw new Error('您传递的天数不合法，必须是大于0的数字！');
	}
	return date;
} 



//获取cookie
function getCookie(name){
	var cookieName = encodeURIComponent(name) + '=';
	var cookieStart = document.cookie.indexOf(cookieName);
	var cookieValue = null;
	if(cookieStart > -1){
		var cookieEnd = document.cookie.indexOf(';',cookieStart);
		if(cookieEnd == -1){   //不存在的时候
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
	}
	return cookieValue;
}

alert(getCookie('user'));







































