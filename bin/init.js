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
		type: 'dir',
		path: 'public/publishTools'
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
		user_id : {type : Sequelize.STRING(40)}, //唯一ID
		nick_name : {type : Sequelize.TEXT}, //昵称
		
		name : {type : Sequelize.STRING(100)},
		password : {type : Sequelize.STRING(32)},

		create_by : {type : Sequelize.STRING(40)},
		update_by : {type : Sequelize.STRING(40)},
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
    "wangeditor": "^3.1.1",
    "images": "^3.0.2"
  }
}

`

	var publishTools = `
	const fs = require('fs');
/**
* 1、修改config，选到指定打包目录
* 2、打包后的文件会保存在index.html同个目录，把access入口修改成打包文件，即可上线
*/

var config = [
{
	version : '1.1.7',
	path : \`\${ __dirname }/../web\`
}, 
// {
// 	version : '1.0.9',
// 	path : \`\${ __dirname } /../sharePage\`
// },
// {
// 	version : '1.0.4',
// 	path : \`\${ __dirname } /../main\`
// }
]

async function getFiles(_config){
	var files = [];
	var accessFile = fs.readFileSync(\`\${ _config.path } /conf/access.js\`).toString();
	files.push(accessFile);

	var modelDirs = fs.readdirSync(\`\${ _config.path } /models\`);
	for (var i = 0; i < modelDirs.length; i++) {
		var pageFile = fs.readFileSync(\`\${_config.path}/models/\${modelDirs[i]}/\${modelDirs[i]}Page.js\`).toString();
		var modelFile = fs.readFileSync(\`\${_config.path}/models/\${modelDirs[i]}/\${modelDirs[i]}Model.js\`).toString();
		files.push(pageFile);
		files.push(modelFile);
	}

	return files.join('\\n');
}

async function main() {
	try {

		for (var i = 0; i < config.length; i++) {
			var _config = config[i];

			var fileData = await getFiles(_config);
			var fileStat = fs.existsSync(\`\${_config.path}/out/bundle-\${_config.version}.js\`);
			if (fileStat == true) {
				console.log('目标版本已存在！请修改版本号');
				return;
			}
			fs.writeFileSync(\`\${_config.path}/out/bundle-\${_config.version}.js\`, fileData);
		}
	} catch (e) {
		console.log(e);
	}


}

main();
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
	await create({
		type: 'file',
		path: 'public/publishTools.js',
		content: publishTools
	})
}

main();