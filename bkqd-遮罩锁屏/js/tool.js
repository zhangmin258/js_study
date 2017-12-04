



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
	if(typeof window.getComputedStyle != 'undefined'){     //计算后的样式(外部加载的css文件)
		return window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currentStyle != 'undefined'){     //行内样式
		return element.currentStyle[attr];
	}
}


//判断class是否存在
function hasClass(element,className){
	return element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
}













