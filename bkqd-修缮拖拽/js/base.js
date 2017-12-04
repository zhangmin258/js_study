

//前台调用
var $ = function(_this){
	return new Base(_this);
}



//创建一个构造函数(基础库)
function Base(_this){
	//创建一个数组，用来保存获取的节点和节点数组；
	this.elements = [];
	if(_this != undefined){    //_this是一个对象，undefined也是一个对象
		this.elements[0] = _this;
	}

	//获取ID节点
	this.getId = function(id){
		this.elements.push(document.getElementById(id));
		return this;
	}

	//获取标签(元素)节点
	this.getTagName = function(tag){
		var tags = document.getElementsByTagName(tag);
		for(var i=0;i<tags.length;i++){
			this.elements.push(tags[i]);
		}
		return this;
	}

}


//获取className节点
Base.prototype.getClass = function(className,classId){
	var node = null;
	if(arguments.length == 2){
		node = document.getElementById(classId);
	}else{
		node = document;
	}
	var all = node.getElementsByTagName('*');    //获取所有的元素标签
	for(var i=0;i<all.length;i++){
		if(all[i].className == className){
			this.elements.push(all[i]);
		}
	}
	return this;
}	


//获取节点数组的某一个
Base.prototype.getElement = function(num){
	var element = this.elements[num];
	this.elements = [];    //清空数组
	this.elements[0] = element;
	return this;
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
			return getStyle(this.elements[i],attr);
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


//拖拽
Base.prototype.drag = function(){
	for(var i=0;i<this.elements.length;i++){

		addEvent(this.elements[i],'mousedown',function(e){
			var e = getEvent(e);

			if(getTarget(e).tagName == 'H2'){	
				addEvent(document,'mousemove',move);
				addEvent(document,'mouseup',up);
			}else{	
				removeEvent(document,'mousemove',move);
				removeEvent(document,'mouseup',up);
			}
		

			if(trim(this.innerHTML).length == 0){
				e.preventDefault();    //阻止默认行为
			}
			var _this = this;
			var diffX = e.clientX - _this.offsetLeft; //鼠标点击的位置离物体边缘的距离
			var diffY = e.clientY - _this.offsetTop;


			function move(e){
				var e = getEvent(e);
				var left = e.clientX - diffX;
				var top = e.clientY - diffY;

				if(left < 0){
					left = 0;
				}else if(left > getInner().width - _this.offsetWidth){
					left = getInner().width - _this.offsetWidth;
				}

				if(top < 0){
					top = 0;
				}else if(top > getInner().height - _this.offsetHeight){
					top = getInner().height - _this.offsetHeight;
				}

				_this.style.left = left + 'px';
				_this.style.top = top + 'px';

				if(typeof _this.Capture != 'undefined'){   //解决IE拖拽留白问题
					_this.Capture();
				}
			}

			function up(){
				removeEvent(document,'mousemove',move);
				removeEvent(document,'mouseup',up);

				if(typeof _this.releaseCapture != 'undefined'){
					_this.releaseCapture();
				}
			}

		});
	}
	return this;
}










