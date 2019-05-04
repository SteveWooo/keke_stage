/**
* @param options.modelName 模块名称
* @param options.path 模块路径
*/
module.exports = async function(swc, options){
	swc.models[options.modelName] = require(options.path);
	swc.log.info('注册模块:' + options.modelName);
	return swc;
}