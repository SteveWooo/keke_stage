/**
* 没有需要传入的参数
* ）但是需要业务在 services/mysql/definedModel里面定义数据模型
*/
const path = require('path')
module.exports = async (swc, options)=>{
	swc = await require(`${__dirname}/../../dao/init`)(swc);
	swc = await require(`${__dirname}/../../dao/defineModel`)(swc, {});
	return swc;
}