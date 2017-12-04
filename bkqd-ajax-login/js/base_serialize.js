


$().extend('serialize',function(){
	for(var i=0;i<this.elements.length;i++){
		var form = this.elements[i];
		var parts = new Object();
		for(var i=0;i<form.elements.length;i++){
			var filed = form.elements[i];
			switch(filed.type){
				case undefined:
				case 'button':
				case 'submit':
				case 'reset':
				case 'file':
					break;
				case 'radio':
				case 'checkbox':
					if(!filed.selected)
					break;
				case 'select-one':
				case 'select-multiple':
					for(var j=0;j<filed.options.length;j++){
						var option = filed.options[j];
						if(option.selected){
							var optValue = '';
							if(option.hasAttribute){   //非IE，判断option中是否有value这个属性
								optValue = (option.hasAttribute('value') ? option.value : option.text);
							}else if(option.attributes('value').specified){    //IE，判断option中是否有value这个属性
								optValue = (option.attributes('value').specified ? option.value : option.text);
							}
							parts[filed.name] = optValue;
						}
					}
					break;
				default:
					parts[filed.name] = filed.value;
			}
		}
		return parts;    //最后返回这个集合对象
	}
	return this;
});

























