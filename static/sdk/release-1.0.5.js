var keke = {};
var vue = {};
var vueEventHub = new Vue();
function initVue(){
	vue = new Vue({
		el : '#app',
		data : {
			routerName : keke.config.routerName,
			subTitle : keke.config.subTitle,
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
									if(res.code == "3002"){
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
							},
							deleteQuery : function(name){
							    var loca = window.location;
							    var baseUrl = loca.origin + loca.pathname + "?";
							    var query = loca.search.substr(1);
							    if (query.indexOf(name)>-1) {
							        var obj = {}
							        var arr = query.split("&");
							        for (var i = 0; i < arr.length; i++) {
							            arr[i] = arr[i].split("=");
							            obj[arr[i][0]] = arr[i][1];
							        };
							        delete obj[name];
							        var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
							        return url
							    };
							},
							ls : {
								set : function(key, value){
									localStorage.setItem(key, value);
								},
								get : function(key){
									return localStorage.getItem(key);
								}
							},
							resHandle : function(res){
								if(res.code != 2000){
									vue.global.common.utils.actions.alert({
										message : res.error_message
									})
									return false;
								}
								return true;
							},
							getLoadingMessage : function(){
								var sourceData = vue.global.common.utils.models.loadingMessage;
								var index = Math.floor(Math.random()*sourceData.data.length);
								return sourceData.data[index];
							}
						},

						//控制器的缓存全局变量
						models : {
							alert : {
								show : false,
								message : "test",
								timeout_instance : undefined
							},
							loadingMessage : {
								data : ['加载中,请稍后.. \\ (° v o) /°',
									'别催了，等会儿..',
									'科科..咳！！咳咳咳！..',
									'(> v >) /° 请稍等',
									'我等到花儿都谢了...',
									'客官，不来杯加菲吗？...',
									'来都来了，不如...',
									'如果你会动，那你就是会动的沙雕...']
							}
						}
					},

					//管理员数据
					adminUser : undefined,

					//获取回来的push数据，例如评论回复的
					pushData : {
						comment : {
							count : 0,
							rows : []
						}
					}
				},
				pages : keke.models
			},
			index : {
				drawer: false,

				//主页侧栏导航：
				menu : keke.config.menu,
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
			},

			gotoThemeList : function(item){
				vue.global.pages['themeList'].conditions.theme_category_id = item.theme_category_id;
				keke.config.routerName['themeList'] = item.title;
				location.hash = 'themeList';
				vue.global.pages.themeCategory.datas.drawer = !vue.global.pages.themeCategory.datas.drawer;
				vue.$emit('gotoThemeList', item);
			},

			gotoShare : function(){
				var theme_id = vue.global.pages['theme'].conditions.theme_id;
				location.href = keke.config.baseOrigin + '/' + keke.config.baseBussinessName + '/share?theme_id=' + theme_id;
			},

			gotoMessageFlow : function(){
				location.hash = 'messageFlow';
				vue.global.pages.themeCategory.datas.drawer = !vue.global.pages.themeCategory.datas.drawer;
			},

			gotoPushComment : function(){
				location.hash = 'pushComment';
				vue.global.pages.themeCategory.datas.drawer = !vue.global.pages.themeCategory.datas.drawer;
			}
		},
		mounted : function(){
			this.init();
		},
	})
}

keke.loadFile = function(options, callback){
	if(options.num == options.groups.length){
		callback(options.result);
		return ;
	}

	if(options.groups[options.num].num == options.groups[options.num].files.length){
		options.num ++;
		keke.loadFile(options,  callback);
		return ;
	}

	var dom = document.createElement("script");
	var group = options.groups[options.num];
	dom.src = group.files[group.num].src;
	document.body.appendChild(dom);

	dom.onload = function(){
		group.num ++;
		options.groups[options.num] = group;

		keke.loadFile(options, callback);
	}
}

keke.init = function(options, callback){
	//配置的加载组件列表
	var components = keke.config.components;
	var sdkList = {
		files : [],
		num : 0,
	}; //必备控件
	var componentList = {
		files : [],
		num : 0
	}; //组件
	var enterList = {
		files : [],
		num : 0
	}; //入口文件
	var modelList = {
		files : [],
		num : 0
	}; //页面数据流
	// sdkList.files.push({
	// 	src : "dist/vue.min.js"
	// })
	// sdkList.files.push({
	// 	src : "dist/vuetify.min.js"
	// })
	// sdkList.files.push({
	// 	src : "dist/wangEditor.min.js"
	// })

	for(var i=0;i<components.length;i++){
		componentList.files.push({
			src : "./models/"+components[i]+"/"+components[i]+"Page.js?r=" + Math.random()
		});
		modelList.files.push({
			src : "./models/"+components[i]+"/"+components[i]+"Model.js?r=" + Math.random()
		})
	}

	// enterList.files.push({
	// 	src : "js/index.js"
	// })

	//本地才需要loadFioe
	if(keke.config.baseOrigin.indexOf('localhost') > 0 || 
		keke.config.baseOrigin.indexOf('127.0.0.1') > 0 ||
		options.mode == 'test') {
		keke.loadFile({
			num : 0,
			groups : [modelList, sdkList, componentList, enterList],
			result : {}
		}, function(result){
			console.log("loaded files");
			initVue();
			callback();
		})
		return ;
	}

	//线上不需要load，因为都打包好了
	initVue();
	callback();
}
keke.models = {};