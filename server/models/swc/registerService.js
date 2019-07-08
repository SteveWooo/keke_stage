module.exports = async function(swc, options){
	swc.services[options.serviceName] = require(options.path);
	swc.log.info('注册服务:' + options.serviceName);
	return swc;
}