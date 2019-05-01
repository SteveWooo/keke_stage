keke.load_files = function(options, callback){
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
}

keke.init = function(){
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
	sdkList.files.push({
		src : "dist/vue.min.js"
	})
	sdkList.files.push({
		src : "dist/vuetify.min.js"
	})
	// sdkList.files.push({
	// 	src : "dist/wangEditor.min.js"
	// })

	for(var i=0;i<components.length;i++){
		componentList.files.push({
			src : "js/models/"+components[i]+"/"+components[i]+"Page.js"
		});
		modelList.files.push({
			src : "./js/models/"+components[i]+"/"+components[i]+"Model.js"
		})
	}

	enterList.files.push({
		src : "js/index.js"
	})

	keke.load_files({
		num : 0,
		groups : [modelList, sdkList, componentList, enterList],
		result : {}
	}, function(result){
		console.log("loaded files");
	})
}
keke.models = {};

keke.init();