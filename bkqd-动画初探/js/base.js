

//前台调用
var $ = function(args){
	return new Base(args);
}



//创建一个构造函数(基础库)
function Base(args){
	//创建一个数组，用来保存获取的节点和节点数组；
	this.elements = [];

	if(typeof args == 'string'){
		//css模拟
		if(args.indexOf(' ') != -1){     //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
			var elements = args.split(' ');   //把节点拆开，分别保存到数组中去
			var childElements = [];     //存放临时节点对象的数组,解决被覆盖的问题
			var node = [];   //存放父节点
			for(var i=0;i<elements.length;i++){
				if(node.length == 0) node.push(document);  //当没有父节点的时候，默认document为父节点
				switch(elements[i].charAt(0)){
					case '#':
						childElements = [];   //清理掉临时节点，以便父节点失效，子节点有效
						childElements.push(this.getId(elements[i].substring(1)));
						node = childElements;  //保存父节点
						break;
					case '.':
						childElements = [];   //清理掉临时节点，以便父节点失效，子节点有效
						for(var j=0;j<node.length;j++){
							var temps = this.getClass(elements[i].substring(1),node[j]);
							for(var k=0;k<temps.length;k++){
								childElements.push(temps[k]);
							}
						}
						node = childElements;   //保存父节点
						break;
					default:
						childElements = [];   //清理掉临时节点，以便父节点失效，子节点有效
						for(var j=0;j<node.length;j++){
							var temps = this.getTagName(elements[i],node[j]);
							for(var k=0;k<temps.length;k++){
								childElements.push(temps[k]);
							}
						}
						node = childElements;   //保存父节点
				}
			}
			this.elements = childElements;
		}else{
			//find模拟
			switch(args.charAt(0)){
				case '#':
					this.elements.push(this.getId(args.substring(1)));
					break;
				case '.':
					this.elements = this.getClass(args.substring(1));
					break;
				default:
					this.elements = this.getTagName(args);
			}
		}
	}else if(typeof args == 'object'){
		if(args != undefined){    //args是一个对象，undefined也是一个对象
			this.elements[0] = args;
		}
	}else if(typeof args == 'function'){
		this.ready(args);
	}
}


//DOM加载
Base.prototype.ready = function(fn){
	addDomLoaded(fn);
}





//获取ID节点
Base.prototype.getId = function(id){
	// this.elements.push(document.getElementById(id));
	return document.getElementById(id);
}




//获取标签(元素)节点
Base.prototype.getTagName = function(tag,parentNode){
	var node = null;
	var temps = [];
	if(parentNode != undefined){
		node = parentNode;
	}else{
		node =document;
	}
	var tags = node.getElementsByTagName(tag);
	for(var i=0;i<tags.length;i++){
		temps.push(tags[i]);
	}
	return temps;
}


//获取className节点
Base.prototype.getClass = function(className,parentNode){
	var node = null;
	var temps = [];
	if(parentNode != undefined){
		node = parentNode;
	}else{
		node = document;
	}
	var all = node.getElementsByTagName('*');    //获取所有的元素标签
	for(var i=0;i<all.length;i++){
		if(all[i].className == className){
			temps.push(all[i]);
		}
	}
	return temps;   //最后返回的是一个数组
}	



//创建css选择器子选择器
Base.prototype.find = function(str){
	var childElements = [];   //创建一个临时的数组存放str;
	for(var i=0;i<this.elements.length;i++){
		switch(str.charAt(0)){
			case '#':
				childElements.push(this.getId(str.substring(1)));
				break;
			case '.':
				var temps = this.getClass(str.substring(1),this.elements[i]);
				for(var j=0;j<temps.length;j++){
					childElements.push(temps[j]);
				}
				break;
			default:
				var temps = this.getTagName(str,this.elements[i]);
				for(var k=0;k<temps.length;k++){
					childElements.push(temps[k]);
				}
		}
	}
	this.elements = childElements;   
	return this;
}




//获取节点数组的某一个,并且返回base对象
Base.prototype.eq = function(num){
	var element = this.elements[num];
	this.elements = [];    //清空数组
	this.elements[0] = element;
	return this;
}


//获取节点数组的某一个,并且返回该节点对象
Base.prototype.ge = function(num){
	return this.elements[num];
}


//获取节点数组的第一个,并且返回该节点对象
Base.prototype.first = function(){
	return this.elements[0];
}

//获取节点数组的最后一个,并且返回该节点对象
Base.prototype.last = function(){
	return this.elements[this.elements.length - 1];
}


//添加class方法
Base.prototype.addClass = function(className){
	for(var i=0;i<this.elements.length;i++){
		if(!hasClass(this.elements[i],className)){
			this.elements[i].className += ' ' + className;
		}
	}
	return this;
}


//移除class方法
Base.prototype.removeClass = function(className){
	for(var i=0;i<this.elements.length;i++){
		if(hasClass(this.elements[i],className)){
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),'');
		}
	}
	return this;
}



//创建css方法
Base.prototype.css = function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length == 1){
			return getStyle(this.elements[i],attr) + 'px';
		}
		this.elements[i].style[attr] = value;
	}
	return this;
}


//创建html方法
Base.prototype.html = function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length == 0){     //当没有传参的时候
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = str;
	}
	return this;
}



//创建点击事件
Base.prototype.click = function(fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick = fn;
	}
	return this;
}




//创建hover事件
Base.prototype.hover = function(over,out){
	for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],'mouseover',over);
		addEvent(this.elements[i],'mouseout',out);
		// this.elements[i].onmouseover = over;
		// this.elements[i].onmouseout = out;
	}
	return this;
}


//显示show事件
Base.prototype.show = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = 'block';
	}
	return this;
}


//隐藏hide事件
Base.prototype.hide = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = 'none';
	}
	return this;
}



//物体居中事件
Base.prototype.center = function(width,height){
	var left = (getInner().width - width)/2;
	var top = (getInner().height - height)/2;
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.left = left + 'px';
		this.elements[i].style.top = top + 'px';
	}
	return this;
}


//改变浏览器窗口大小事件
Base.prototype.resize = function(fn){
	for(var i=0;i<this.elements.length;i++){
		var element = this.elements[i];
		// window.onresize = function(){
		// 	fn();
		// 	if(element.offsetLeft > getInner().width - element.offsetWidth){
		// 		element.style.left = getInner().width - element.offsetWidth + 'px';
		// 	}
		// 	if(element.offsetTop > getInner().height - element.offsetHeight){
		// 		element.style.top = getInner().height - element.offsetHeight + 'px';
		// 	}
		// }
		addEvent(window,'resize',function(){
			fn();
			if(element.offsetLeft > getInner().width - element.offsetWidth){
				element.style.left = getInner().width - element.offsetWidth + 'px';
			}
			if(element.offsetTop > getInner().height - element.offsetHeight){
				element.style.top = getInner().height - element.offsetHeight + 'px';
			}
		});
	}
	return this;
}


//遮罩锁屏
Base.prototype.lock = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.width = getInner().width + 'px';
		this.elements[i].style.height = getInner().height + 'px';
		this.elements[i].style.display = 'block';
		addEvent(window,'scroll',scrollTop);
	}
	return this;
}

//解锁
Base.prototype.unlock = function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = 'none';
		document.documentElement.style.overflow = 'auto';
		removeEvent(window,'scroll',scrollTop);
	}
	return this;
}


//拖拽插件入口
Base.prototype.extend = function(name,fn){
	Base.prototype[name] = fn;
}















//添加link或style的css规则
Base.prototype.addRule = function(num,selectorText,cssText,position){
	var sheet = document.styleSheets[num];
	if(typeof sheet.insertRule != 'undefined'){   //W3C
		sheet.insertRule(selectorText+'{'+cssText+'}',position);
	}else if(typeof sheet.addRule != 'undefined'){   //IE
		sheet.addRule(selectorText,cssText,position);
	}

	return this;
}


//移除link或style的css规则
Base.prototype.removeRule = function(num,index){
	var sheet = document.styleSheets[num];
	if(typeof sheet.deleteRule != 'undefined'){   //W3C
		sheet.deleteRule(index);
	}else if(typeof sheet.removeRule != 'undefined'){   //IE
		sheet.removeRule(index);
	}

	return this;
}


//动画
/*
	参数说明：
	attr: 目标运动的属性；
	step:目标运动的步长；
	start: 目标运动的起始位置；
	target: 目标运动的重点位置；

	参数太多，可以采用对象传参的方式；


 */


Base.prototype.animate = function(obj){
	for(var i=0;i<this.elements.length;i++){

		var element = this.elements[i];   //解决多层作用域的问题

		var attr = 	obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' :
					obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' : 'left';        //可选left和top,不选则默认为left;

		var step = obj['step'] != undefined ? obj['step'] : 10;      //可选，不选则默认每次运行10px;

		var t = obj['t'] != undefined ? obj['t'] : 50;    //可选，不选则默认为每次运行一个步长需要50ms;

		var start = obj['start'] != undefined ? obj['start'] : getStyle(element,attr);   //可选，不选则默认为起始值；

		var target = obj['target'];    //目标值

		var alert = obj['alert'];    //增加值

		if(alert != undefined && target == undefined){
			target = alert + start;
		}else if(alert == undefined && target == undefined){
			throw new Error('alert增量和target目标量必须传一个');
		}



		var speed = obj['speed'] != undefined ? obj['speed'] : 6;     //可选，默认值缓冲速度为6
		var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';   //可选，默认为缓冲运动

		
		if(start > target) step = -step;
		element.style[attr] = start + 'px';    //每次运动完毕，初始化目标的起始位置；
		clearInterval(window.timer);   //window.timer相当一个全局变量，避免多次点击造成多次执行动画


		timer = setInterval(function(){
			
			if(type == 'buffer'){   //缓冲运动
				step = (target - getStyle(element,attr))/speed;
				if(step > 0){     //解决动画突兀的问题
					step = Math.ceil(step);
				}else{
					step = Math.floor(step);
				}
			}

			if(step == 0){
				setTarget();
			}else if(step > 0 && Math.abs(getStyle(element,attr) - target) <= step){    //向右运动(停止运动)
				setTarget();
			}else if(step < 0 && (getStyle(element,attr) - target) <= Math.abs(step)){   //向左运动(停止运动)
				setTarget();
			}else{
				element.style[attr] = getStyle(element,attr) + step + 'px';
			}
			document.getElementById('aaa').innerHTML += getStyle(element,attr) + '<br>';
		},t);

		function setTarget(){
			element.style[attr] = target + 'px';
			clearInterval(timer);
		}
	}
	return this;

}









































