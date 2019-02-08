var keke = {
	load_files : function(options, callback){
		if(options.num == options.groups.length){
			callback(options.result);
			return ;
		}

		if(options.groups[options.num].num == options.groups[options.num].files.length){
			options.num ++;
			keke.load_files(options,  callback);
			return ;
		}

		var dom = document.createElement("script");
		var group = options.groups[options.num];
		dom.src = group.files[group.num].src;
		document.body.appendChild(dom);

		dom.onload = function(){
			group.num ++;
			options.groups[options.num] = group;

			keke.load_files(options, callback);
		}
	},
	init : function(){
		var sdk_list = {
			files : [],
			num : 0,
		}; //必备控件
		var component_list = {
			files : [],
			num : 0
		}; //组件
		var enter_list = {
			files : [],
			num : 0
		}; //入口文件
		var leaves_list = {
			files : [{
				src : "./js/leaves/login.js"
			}, {
				src : "./js/leaves/hello.js"
			}],
			num : 0
		}; //页面数据流

		sdk_list.files.push({
			src : "dist/jquery.min.js"
		})
		sdk_list.files.push({
			src : "dist/vue.min.js"
		})
		sdk_list.files.push({
			src : "dist/vuetify.min.js"
		})

		var component_paths = [
			"js/components/hello/hello_page.js",
			"js/components/login/login_page.js",
		]

		for(var i=0;i<component_paths.length;i++){
			component_list.files.push({
				src : component_paths[i]
			})
		}

		enter_list.files.push({
			src : "js/index.js"
		})

		keke.load_files({
			num : 0,
			groups : [leaves_list, sdk_list, component_list, enter_list],
			result : {}
		}, function(result){
			console.log("loaded files");
		})
	},

	//数据流
	leaves : {}
}

keke.init();