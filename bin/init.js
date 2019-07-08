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
		swc.startup(swc);
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

	await create({
		type : 'file',
		path : 'startup.js',
		content : startupJS
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