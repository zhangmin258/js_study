













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
		for(var i in obj.events[type]){    //遍历多个事件处理函数，
			if(obj.events[type][i] == fn){   //当遍历到的某个函数等于我要删除的那个函数
				delete obj.events[type][i];  //就删除那个函数
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
// function preDef(e){
// 	var e = e || window.event;
// 	if(typeof e.preventDefault != 'undefined'){
// 		e.preventDefault();
// 	}else{
// 		e.returnValue = false;
// 	}
// }


//跨浏览器获取字符编码
function getCharCode(e){
	var e = e || window.event;
	if(typeof e.charCode == 'number'){
		return e.charCode;
	}else{
		return e.keyCode;
	}
}






