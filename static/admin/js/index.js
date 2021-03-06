var vue = new Vue({
	el : '#app',
	data : {
		router_name : {
			'login' : '登陆',
			'hello' : 'hello',
			'demo' : 'demo'
		},
		router : "",
		global : {
			common : {
				//控制器们
				utils : {
					actions : {
						/*
						* options : { message : 弹窗消息体 }
						*/
						alert : function(options){
							vue.global.common.utils.models.alert.message = options == undefined ? 
								"default alert" : options.message;
							//清除上一次的计时器
							if(vue.global.common.utils.models.alert.timeout_instance){
								clearTimeout(vue.global.common.utils.models.alert.timeout_instance);
							}
							vue.global.common.utils.models.alert.show = true;
							vue.global.common.utils.models.alert.timeout_instance = setTimeout(function(){
								vue.global.common.utils.models.alert.show = false;
								vue.global.common.utils.models.alert.timeout_instance = undefined;
							}, 1200)
						},
						ajax : function(options){
							options.success = function(res){
								if(typeof res != "object"){
									res = JSON.parse(res);
								}
								if(res.status == "3002"){
									let hash = res.hash;
									location.hash = hash;
									return res;
								}
								options.successFunction && options.successFunction(res);
							}

							options.error = function(e){
								options.errorFunction && options.errorFunction(e);
							}

							$.ajax(options);
						},
						timetranfers : function(date){
						    var date = new Date(date * 1);//如果date为13位不需要乘1000
						    var Y = date.getFullYear() + '-';
						    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
						    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
						    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
						    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
						    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
						    return Y+M+D+h+m+s;
						},
						getQuery : function(variable){
							var query = window.location.search.substring(1);
							var vars = query.split("&");
							for (var i=0;i<vars.length;i++) {
							       var pair = vars[i].split("=");
							       if(pair[0] == variable){return pair[1];}
							}

							return undefined;
						}
					},

					//控制器的缓存全局变量
					models : {
						alert : {
							show : false,
							message : "test",
							timeout_instance : undefined
						}
					}
				},

				//管理员数据
				adminUser : undefined,
				initHandle : function(){
					//登陆页面不需要获取管理员信息
					if(location.hash == "login"){
						return ;
					}
					vue.global.common.utils.actions.ajax({
						url : keke.config.baseUrl + "/api/m/user/get",
						type : "post",
						successFunction : function(res){
							if(res.status != "2000"){
								alert(res.error_message);
								return res;
							}
							vue.global.common.adminUser = res.source.admin_user;
							return res;
						},
						errorFunction : function(){
							alert("网络错误");
						}
					})
				}
			},
			pages : keke.models
		},
		index : {
			drawer: false,

			//主页侧栏导航：
			menu : keke.config.menu
		}
	},
	methods : {
		initRouter : function(){
			var that = this;
			//监听路由
			this.router = location.hash.substring(1);
			window.onhashchange = function(){
				that.router = location.hash.substring(1);
			}
			history.pushState(null, null, document.URL);
			//禁用返回事件
			window.addEventListener('popstate', function () {
			    history.pushState(null, null, document.URL);
			});
			//禁用F5刷新按钮(mac无解)
			document.onkeydown = function(e){
				if(e.keyCode == 16){
					e.keyCode = 0;
					e.cancelBubble = true;
					return false;
				}
			}

		},
		init : function(){
			this.initRouter();
		},
		drawerRouter : function(r){
			location.hash = r;
			this.index.drawer = !this.index.drawer;
		},

		toLoginPage : function(){
			location.hash = "login";
		}
	},
	mounted : function(){
		this.init();
	}
})