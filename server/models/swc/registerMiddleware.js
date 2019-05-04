/**
* @param options.modelName 中间件名称
* @param options.path 中间件路径
*/
module.exports = async function(swc, options){
	swc.middlewares[options.modelName] = require(options.path);
	swc.log.info('注册中间件:' + options.modelName);
	return swc;
}