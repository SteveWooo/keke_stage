/**
* 初次加载
*/
keke.config = {
	components : [
		'stickerCategory',
		'login'
	],
	menu : [{
		text : "原图分类管理",
		icon: 'history',
		router : "stickerCategory"
	}, {
		text : "登陆",
		icon: 'history',
		router : "login"
	}],

	routerName : {
		'stickerCategory' : '表情原图分类管理',
		'login' : '登陆'
	},

	baseUrl : location.origin + "/keke", //根目录路径+业务
	baseResUrl : location.origin + "/keke/res", //资源根目录路径
	baseOrigin : location.origin, //源站点
}

// function loadInitFile(mode){
// 	var dom = document.createElement("script");
// 	dom.src = 'js/init.js';
// 	document.body.appendChild(dom);
// }

function accessSuccess(){
	$.ajax({
		url : keke.config.baseUrl + "/api/p/mode/get",
		success : function(res){
			keke.init({
				mode : res.mode
			});
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