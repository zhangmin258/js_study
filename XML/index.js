



//IE中的XML
//创建XML DOM
// var xmlDom = new ActiveXObject('MSXML2.DOMDocument6.0');

// alert(xmlDom);  


// function createXMLDOM(){
// 	var version = [
// 		'MSXML2.DOMDocument6.0',
// 		'MSXML2.DOMDocument3.0',
// 		'MSXML2.DOMDocument'
// 	];
// 	for(var i=0;i<version.length;i++){
// 		try{
// 			var xmlDom = new ActiveXObject(version[i]);
// 			return xmlDom;

// 		}catch(e){
// 			//跳过
// 		}
// 	}
// 	throw new Error('您的浏览器或系统不支持MSXML库！');
// }

//载入XML文件，两种方式；1、加载XML字符loadXML(); 
// var xmlDom = createXMLDOM();
// xmlDom.loadXML(        //加载XML字符串
// 		'<root>\n'+
// 			'<user>Lee</user>'+
// 		'\n</root>' 
// );

// // alert(xmlDom.xml);   //序列化XML,打印出字符串

// var user = xmlDom.getElementsByTagName('user')[0];
// alert(user.firstChild.nodeValue);    //Lee


//2、加载XML外部文件load();

// var xmlDom = createXMLDOM();


//在服务器端。默认使用的是异步加载，load()还没有加载完毕，就去打印xmlDom.xml的字符串，所以会打印出空；
//所以在这里，我们应该使用同步加载

// xmlDom.async = false;    //同步加载,会出现假死状态  同步为false,异步为true,默认为异步加载

// xmlDom.async = true;   //异步加载

// xmlDom.onreadystatechange = function(){
// 	if(xmlDom.readyState == 4){
// 		if(xmlDom.parseError.errorCode == 0){
// 			alert(xmlDom.xml);
// 		}else{
// 			throw new Error(
// 				'错误行号：'+xmlDom.parseError.line+
// 				'\n错误代号：'+xmlDom.parseError.errorCode+
// 				'\n错误解释：'+xmlDom.parseError.reason
// 			);
// 		}
// 	}
// }

// xmlDom.load('index.xml');   //加载外部文件


// alert(xmlDom.xml);

// var user = xmlDom.getElementsByTagName('user')[0];
// alert(user.firstChild.nodeValue);    //Lee






//创建DOM2级的XML(同步加载)
// var xmlDom = document.implementation.createDocument('','root',null);   //创建xmlDom
// xmlDom.async = false;    //同步加载
// xmlDom.load('index.xml');   //加载外部文件
// // alert(xmlDom);   //[object DOMImplementation]
// // alert(xmlDom.documentElement.tagName);   //root 根标签

// //用标准DOM去创建节点
// var user = xmlDom.createElement('user');
// xmlDom.documentElement.appendChild(user);
// alert(xmlDom.getElementsByTagName('user')[0].tagName);






//创建DOM2级的XML(异步加载)
// var xmlDom = document.implementation.createDocument('','root',null);   //创建xmlDom
// xmlDom.async = true;    //异步加载
// xmlDom.onload = function(){
// 	alert(xmlDom.getElementsByTagName('user')[0].firstChild.nodeValue);
// }

// xmlDom.load('index.xml');;  //加载外部文件















//跨浏览器处理XML
function getXMLDOM(xmlStr){
	var xmlDom = null;
	if(typeof window.DOMParser != 'undefined'){    //W3C
		xmlDom = (new DOMParser).parseFromString(xmlStr,'text/xml');
		var errors = xmlDom.getElementsByTagName('parsererror');
		if(errors.length > 0){
			throw new Error('错误信息：' + errors[0].textContent);
		}
	}else if(typeof window.ActiveXObject != 'undefined'){    //IE
		var version = [
			'MSXML2.DOMDocument6.0',
			'MSXML2.DOMDocument3.0',
			'MSXML2.DOMDocument'
		];
		for(var i=0;i<version.length;i++){
			try{
				var xmlDom = new ActiveXObject(version[i]);
			}catch(e){
				//跳过
			}
		}
		xmlDom.loadXML(xmlStr);
		if(xmlDom.parseError != 0){
			throw new Error('错误信息：'+ xmlDom.parseError.reason);
		}
		return xmlDom;
	}else{
		throw new Error('您的系统或浏览器不支持XML DOM对象！');
	}

	return xmlDom;
}


//序列化XML
function serializerXML(){
	var xml = '';
	if(typeof window.XMLSerializer != 'undefined'){
		xml = (new XMLSerializer()).serializeToString(xmlDom);
	}else if(typeof xmlDom.xml != 'undefined'){
		xml = xmlDom.xml;
	}
	return xml;
}

var xmlStr = '<root><user>Lee</user></root>';   //为了实现兼容，放弃了从外部引用xml文件，而是采用了字符窜序列化的方法

var xmlDom = getXMLDOM(xmlStr);
alert(serializerXML(xmlDom));



















