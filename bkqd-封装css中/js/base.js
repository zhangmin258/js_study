

//前台调用
var $ = function(){
	return new Base();
}



//创建一个构造函数(基础库)
function Base(){
	//创建一个数组，用来保存获取的节点和节点数组；
	this.elements = [];

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








//创建css方法
Base.prototype.css = function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length == 1){
			if(typeof window.getComputedStyle != 'undefined'){     //计算后的样式(外部加载的css文件)
				return window.getComputedStyle(this.elements[i],null)[attr];
			}else if(typeof this.elements[i].currentStyle != 'undefined'){     //行内样式
				return this.elements[i].currentStyle[attr];
			}
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











































