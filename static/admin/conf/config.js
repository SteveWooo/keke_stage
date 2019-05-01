/**
* 初次加载
*/
var keke = {};
keke.config = {
	components : [
		'hello', 
		'login',
		'demo',
	],
	menu : [{
		text : "登陆",
		icon: 'history',
		router : "login"
	},{
		text : "hello",
		icon: 'history',
		router : "hello"
	},{
		text : "demo",
		icon: 'history',
		router : "demo"
	}],

	baseUrl : location.origin + "/keke", //根目录路径+业务
	baseResUrl : location.origin + "/keke/res", //资源根目录路径
	baseOrigin : location.origin, //源站点
}

function loadInitFile(mode){
	var dom = document.createElement("script");
	dom.src = 'js/init.js';
	document.body.appendChild(dom);
}

function accessSuccess(){
	$.ajax({
		url : keke.config.baseUrl + "/api/p/mode/get",
		success : function(res){
			loadInitFile(res.mode);
		},
		error : function(e){
			alert('网络错误！')
		}
	})
}

function access () {
	//DO SOMETHING:
	accessSuccess();
}

access()