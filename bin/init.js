const fs = require('fs');
var BASE_DIR = __dirname + '/../../';

async function create(options){
	try{
		if(options.type == 'dir'){
			fs.mkdirSync(BASE_DIR + options.path);
		} else {
			fs.writeFileSync(BASE_DIR + options.path, options.content);
		}
	}catch(e){

	}	
}

async function main(){
	await create({
		type : 'dir',
		path : 'controllers'
	});
	await create({
		type : 'dir',
		path : 'dao'
	});
	await create({
		type : 'dir',
		path : 'middlewares'
	});
	await create({
		type : 'dir',
		path : 'conf'
	});
	await create({
		type : 'dir',
		path : 'models'
	});
	await create({
		type : 'dir',
		path : 'services'
	});
	await create({
		type : 'dir',
		path : 'public'
	});
	await create({
		type : 'dir',
		path : 'services/http'
	});
	await create({
		type : 'dir',
		path : 'unionTest'
	});

	var startupJS = `
async function main(){
	var swc;
	try{
		swc = await require("./keke_stage/server/models/swc/init")();
		swc = await require('./controllers/access')(swc, {});
		//swc.startup(swc);
	}catch(e){
		console.log(e);
		process.exit();
	}
}

main();
	`;

	var accessJs = `
module.exports = async (swc, options)=>{
	return swc;
}
	`;

	var configJson = `
{
	"server" : {
		"port" : 81,
		"base_res_path" : "res",
		"public_salt" : "keke_salt",
		"bussiness_name" : "keke"
	},
	"mysql" : {
		"host" : "localhost",
		"user" : "root",
		"password" : "123456",
		"database" : "keke",
		"port" : 3306
	},
	"bussiness" : {
		
	}
}
	`;

	var daoJs = 
`
const Sequelize = require("sequelize");
exports.defineModel = async function defineModel(swc){
	swc.dao.models.admins = swc.dao.seq.define("admins", {
		user_id : {type : Sequelize.STRING(32)}, //唯一ID
		nick_name : {type : Sequelize.TEXT}, //昵称
		
		name : {type : Sequelize.STRING(100)},
		password : {type : Sequelize.STRING(32)},

		create_by : {type : Sequelize.STRING(32)},
		update_by : {type : Sequelize.STRING(32)},
		create_at : {type : Sequelize.STRING(13)},
		update_at : {type : Sequelize.STRING(13)},
	})
	return swc;
}

exports.defineIndex = async function defineIndex(swc){
	// swc.dao.models.demos.belongsTo(swc.dao.models.admins, {
	// 	foreignKey : 'create_by', //多的一个数据实体
	// 	targetKey : 'admin_id', //少的一个数据实体
	// 	as : 'admin'
	// })

	swc.log.info('载入:数据索引');
	return swc;
}
`

	var packageJson = 
`
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cheerio": "^1.0.0-rc.3",
    "express": "^4.16.4",
    "express-session": "^1.16.1",
    "mysql2": "^1.6.5",
    "request": "^2.88.0",
    "sequelize": "^5.3.0",
    "svg-captcha": "^1.3.12",
    "wangeditor": "^3.1.1"
  }
}

`

	await create({
		type : 'file',
		path : 'startup.js',
		content : startupJS
	})
	await create({
		type : 'file',
		path : 'package.json',
		content : packageJson
	})
	await create({
		type : 'file',
		path : 'dao/mysql.js',
		content : daoJs
	})
	await create({
		type : 'file',
		path : 'conf/config.json',
		content : configJson
	})
	await create({
		type : 'file',
		path : 'controllers/access.js',
		content : accessJs
	})
}

main();