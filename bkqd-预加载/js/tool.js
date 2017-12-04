


//浏览器检测
(function(){    //闭包，里面放一个匿名函数，浏览器打开的时候就会被执行，不需要被调用

	window.sys = {};   //保存浏览器信息对象，全局变量，外部可以访问

	var ua = navigator.userAgent.toLowerCase();   //获取浏览器信息字符窜

	var s;      //浏览器信息数组，浏览器名称 + 浏览器版本



	//IE浏览器
	if((/msie ([\d\.]+)/).test(ua)){
		s = ua.match(/msie ([\d\.]+)/);
		sys.ie = s[1];      //获取浏览器版本
	}

	//firefox浏览器
	if((/firefox\/([\d\.]+)/).test(ua)){
		s = ua.match(/firefox\/([\d\.]+)/);
		sys.firefox = s[1];      
	}

	//chrome浏览器
	if((/chrome\/([\d\.]+)/).test(ua)){
		s = ua.match(/chrome\/([\d\.]+)/);
		sys.chrome = s[1];     
	}

	//opera浏览器
	if(/opera\/.*version\/([\d\.]+)/.test(ua)){
		s = ua.match(/opera\/.*version\/([\d\.]+)/);
		sys.opera = s[1];
	}

	//safari浏览器
	if(/version\/([\d\.]+).*safari/.test(ua)){
		s = ua.match(/version\/([\d\.]+).*safari/);
		sys.safari = s[1];
	}

	//webkit浏览器
	if(/webkit\/([\d\.]+)/.test(ua)){
		s = ua.match(/webkit\/([\d\.]+)/);
		sys.webkit = s[1];
	}



})();



//DOM加载
function addDomLoaded(fn){
	var isReady = false;
	var timer = null;
	function doReady(){
		if(timer) clearInterval(timer);
		if(isReady) return;
		isReady = true;
	}

	//兼容低版本浏览器
	if((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)){
		timer = setInterval(function(){
			if(/loaded|complete/.test(document.readyState)){
				doReady();
			}
		},1);
	}else if(document.addEventListener){    //w3c
		addEvent(document,'DOMContentLoaded',function(){
			fn();
			removeEvent(document,'DOMContentLoaded',arguments.callee);
		});
	}else if(sys.ie && sys.ie < 9){
		var timer = null;
		timer = setInterval(function(){
			try{
				document.documentElement.doScroll('left');
				doReady();
			}catch(e){}
		},1);
	}

}






//跨浏览器添加事件绑定
function addEvent(obj,type,fn){
	if(obj.addEventListener){   //W3C
		obj.addEventListener(type,fn,false);
	}else{
		//创建一个存放事件的哈希表(散列表)
		if(!obj.events)obj.events = {};
		
		//第一次执行的时候执行
		if(!obj.events[type]){
			//创建一个存放事件处理函数的数组
			obj.events[type] = [];
			//把第一次事件处理函数先储存在第一个位置上
			if(obj['on'+type])obj.events[type][0] = fn;
		}else{
			//同一个函数进行屏蔽，不添加到计数器中
			if(addEvent.equal(obj.events[type],fn) == true) return false;
		}

		//从第二次开始我们用事件计数器来储存 
		obj.events[type][addEvent.ID++] = fn;
		//执行事件处理函数
		obj['on'+type] = addEvent.exec;
	}
}

//为每个事件绑定分配一个计数器
addEvent.ID = 1;

//执行事件处理函数
addEvent.exec = function(e){
	var e = e || addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for(var i in es){
		es[i].call(this,e);
	}
}



//把IE常用的Event对象配对到W3C里面去
addEvent.fixEvent = function(e){
	e.preventDefault = addEvent.fixEvent.preventDefault;            //阻止默认行为
	e.stopPropagation = addEvent.fixEvent.stopPropagation;             //阻止冒泡行为
	return e;
}


//IE阻止默认行为
addEvent.fixEvent.preventDefault = function(){
	this.returnValue = false;
}

//IE阻止冒泡行为
addEvent.fixEvent.stopPropagation = function(){
	this.cancelBubble = true;
}




//同一注册函数进行屏蔽
 addEvent.equal = function(es,fn){
 	for(var i in es){
 		if(es[i] == fn)return true;
 	}
 	return false;
 }


//跨浏览器移除事件绑定
function removeEvent(obj,type,fn){
	if(obj.removeEventListener){    //W3C
		obj.removeEventListener(type,fn,false);
	}else{
		if(obj.events){
			for(var i in obj.events[type]){    //遍历多个事件处理函数，
				if(obj.events[type][i] == fn){   //当遍历到的某个函数等于我要删除的那个函数
					delete obj.events[type][i];  //就删除那个函数
				}
			}
		}
	}
}


//跨浏览器获取事件目标对象
function getTarget(e){
	if(e.target){
		return e.target;
	}else if(window.event.srcElement){
		return window.event.srcElement;
	}
}


//跨浏览器阻止事件默认行为
function preDef(e){
	var e = e || window.event;
	if(typeof e.preventDefault != 'undefined'){
		e.preventDefault();
	}else{
		e.returnValue = false;
	}
}


//跨浏览器获取字符编码
function getCharCode(e){
	var e = e || window.event;
	if(typeof e.charCode == 'number'){
		return e.charCode;
	}else{
		return e.keyCode;
	}
}






//跨浏览器获取屏幕窗口大小
function getInner(){
	if(typeof window.inneWidth != 'undefined'){    //兼容火狐
		return{
			width: window.inneWidth,
			height: window.innerHeight
		}
	}else{
		return{
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		}
	}
}



//跨浏览器获取style
function getStyle(element,attr){
	var value;
	if(typeof window.getComputedStyle != 'undefined'){     //计算后的样式(外部加载的css文件)
		value = window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currentStyle != 'undefined'){     //行内样式
		value = element.currentStyle[attr];
	}
	return value;
}


//判断class是否存在
function hasClass(element,className){
	return element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
}



//获取event对象
function getEvent(e){
	return e || window.event;
}


//删除左右空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}




//滚动条清零
// function scrollTop(){
// 	document.documentElement.scrollTop = 0;
// 	document.body.scrollTop = 0;
// }


//跨浏览器获取滚动条位置
function getScroll(){
	return{
		top: document.documentElement.scrollTop || document.body.scrollTop,
		left: document.documentElement.scrollLeft || document.body.scrollLeft
	}
}



//跨浏览器获取innerText
function getInnerText(element){
	return (typeof element.textContent == 'string') ? element.textContent : element.innerText;
}

//跨浏览器设置innerText
function setInnerText(element,text){
	if(typeof element.textContent == 'string'){
		element.textContent = text;
	}else{
		element.innerText = text;
	}
}


//判断某一个值是否在这个数组里
function inArray(array,value){
	for(var i in array){
		if(array[i] === value){
			return true;
		}else{
			return false;
		}
	}
}



//获取某一个元素到最外层顶点的距离
function offsetTop(element){
	var top = element.offsetTop;
	var parent = element.offsetParent;
	while(parent != null){
		top += parent.offsetTop;
		parent = parent.offsetParent
	}
	return top;
}




//获取当前节点的上一个节点的索引值
function prevIndex(current,parent){
	var length = parent.children.length;
	if(current == 0) return length - 1;
	return parseInt(current) - 1;
}

//获取当前节点的下一个节点的索引值
function nextIndex(current,parent){
	var length = parent.children.length;
	if(current == length - 1) return 0;
	return parseInt(current) + 1;
}
















