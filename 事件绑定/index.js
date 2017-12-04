

//传统事件绑定

// window.onload = function(){
// 	alert(1);
// }

// window.onload = function(){
// 	alert(2);
// }


// window.onload = function(){    //只会执行最后一次，上面的2次会被覆盖
// 	alert(3); 
// }




//现代事件绑定
// addEvent(window,'load',function(){
// 	alert(1);
// });

// addEvent(window,'load',function(){
// 	alert(2);
// });


// addEvent(window,'load',function(){
// 	alert(3);
// });

//函数会按顺序依次执行，不会被覆盖 (IE7和IE8会倒序执行)





window.onload = function(){

	var button = document.getElementById('button');
	// addEvent(button,'click',fn1);
	// addEvent(button,'click',fn2);
	// addEvent(button,'click',fn3);

	// removeEvent(button,'click',fn2);
	
	// var a = document.getElementById('a');
	// addEvent(a,'click',function(e){
	// 	// preDef(e);
	// 	e.preventDefault();
	// });
	
	addEvent(button,'click',function(e){
		alert('button');
		e.stopPropagation();
	});

	addEvent(document,'click',function(){
		alert('document');
	});



}


// function fn(){
// 	alert(1);
// }

// function fn(e){
// 	alert(e.clientX);
// 	// alert(this.value);
// }

function fn1(e){
	alert('1'+this.value+e.clientX);
}

function fn2(){
	alert('2');
}

function fn3(){
	alert('3');
}

// IE会执行3次，其他浏览器只会执行1次；


























