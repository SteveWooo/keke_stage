module.exports = async function(swc, options){
	swc.dao[options.daoName] = require(options.path);
	swc.log.info('注册服务:' + options.daoName);
	return swc;
}