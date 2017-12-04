
























//跨浏览器添加事件
function addEvent(obj,type,fn){
	if(obj.addEventListener){
		obj.addEventListener(type,fn,false);
	}else if(obj.attachEvent){
		obj.attachEvent('on'+type,fn);
	}
}

//跨浏览器移除事件
function removeEvent(obj,type,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(type,fn,false);
	}else if(obj.detachEvent){
		obj.detachEvent('on'+type,fn);
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






