

//前台调用
var $ = function(){
	return new Base();
}



//创建一个构造函数
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



//创建css方法
Base.prototype.css = function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style[attr] = value;
	}
	return this;
}


//创建html方法
Base.prototype.html = function(str){
	for(var i=0;i<this.elements.length;i++){
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











































