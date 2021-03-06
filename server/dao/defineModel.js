/**
* @param options.servicePath 索引和数据模型文件的路径。该文件有规定的编写模式，
* 暴露2个api：defineModel和defineIndex
* )需要先定义数据模型，同步到数据库，才能定义索引关系
*/

const Sequelize = require("sequelize");

async function syncDatabase(swc){
	await swc.dao.seq.sync();
	swc.log.info('同步:数据库模型同步到数据库');
	return swc;
}

module.exports = async (swc, options)=>{
	var path;
	if(options.servicePath != undefined){
		path = options.servicePath;
	}
	if(options.path != undefined){
		path = options.path;
	}
	var bussinessModel = require(path);
	swc = await bussinessModel.defineModel(swc);
	swc.log.info('载入:数据库模型');
	if(swc.argv.d === '1'){
		swc = await syncDatabase(swc);
	}
	swc = await bussinessModel.defineIndex(swc);
	return swc;
}