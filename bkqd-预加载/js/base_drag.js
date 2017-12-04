


$().extend('drag',function(){
	var tags = arguments;
	for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],'mousedown',function(e){
			var e = getEvent(e);

			//自定义拖拽区域
			var flag = false;
			for(var i=0;i<tags.length;i++){
				if(getTarget(e) == tags[i]){
					flag = true;   //当返回true的时候，就停止下面的操作
					break;
				}
			}

			if(flag == true){	
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
				}else if(left <= getScroll().left){
					left = getScroll().left;
				}else if(left > getInner().width + getScroll().left - _this.offsetWidth){
					left = getInner().width + getScroll().left - _this.offsetWidth;
				}

				if(top < 0){
					top = 0;
				}else if(top <= getScroll().top){
					top = getScroll().top;
				}else if(top > getInner().height + getScroll().top - _this.offsetHeight){
					top = getInner().height + getScroll().top - _this.offsetHeight;
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
});






















