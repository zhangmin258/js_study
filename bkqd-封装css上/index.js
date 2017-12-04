







window.onload = function(){
	// alert(Base.getId('box'));   //[object HTMLDivElement]
	// var base = new Base();
	// alert(base.getId('box'));  //[object Object]
	$().getId('box').css('color','red').css('background','black').html('pox').click(function(){
		alert(this.innerHTML);
	});
	
	$().getTagName('p').css('color','green').css('background','pink');


}






































