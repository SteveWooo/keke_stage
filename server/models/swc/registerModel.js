/**
* @param options.modelName 模块名称
* @param options.path 模块路径

* @param options.modelFilePath 模块文件存放路径，递归去搞他们下来了
*/
module.exports = async function(swc, options){
	/**
	* 如果是传了整体目录进来，那就去搞整个目录下来
	*/
	if(options.middlewareFilePath !== undefined){
		options.filePath = options.middlewareFilePath;
		options.dirStack = [];
		swc = await travelServiceFiles(swc, options);
		return swc;
	}

	/**
	* 注册单个模块
	*/
	swc.models[options.modelName] = require(options.path);
	swc.log.info('注册模块:' + options.modelName);
	return swc;
}