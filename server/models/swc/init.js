const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const path = require('path');
/**
* 拿进程参数
*/
async function getArgv(){
	var argv = {};
	for(var i=2;i<process.argv.length;i++){
		if(process.argv[i].indexOf("-") == 0){
			argv[process.argv[i].replace("-","")] = process.argv[i + 1];
		}
	}

	//默认两条进程
	if(!argv.c){
		argv.c = 2;
	}

	return argv;
}

/**
* 此处载入配置
*/
async function loadConfig(swc){
	//此处填入配置
	if(!swc.argv.m){
		//默认开发模式
		swc.config = require(`${__dirname}/../../../../conf/config.json`);
	} else if (swc.argv.m === 'prod'){
		//设置一下全局环境
		swc.mode = swc.argv.m;
		swc.config = require(`${__dirname}/../../../../conf/config.prod.json`);
	} else if (swc.argv.m === 'test') {
		//设置一下全局环境
		swc.mode = swc.argv.m;
		swc.config = require(`${__dirname}/../../../../conf/config.test.json`);
	} else {
		swc.log.error('4005:输入参数错误(m)');
		throw '';
	}

	return swc;
}

/**
* load express middlewares
* )需要在服务启动之前再添加这些配置。
*/
async function loadExpressMiddlewares(swc){
	swc.app.all('*', function(req, res, next) {
		res.header('Access-Control-Allow-Origin', 'https://deadfishcrypto.com');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
		res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
		next()
	})

	swc.app.all('*.png', function(req, res, next){
		res.header('Cache-Control', 'public, max-age=86400');
		next();
	})

	swc.app.all('*.jpg', function(req, res, next){
		res.header('Cache-Control', 'public, max-age=86400');
		next();
	})

	swc.app.all('*.jpeg', function(req, res, next){
		res.header('Cache-Control', 'public, max-age=86400');
		next();
	})

	swc.app.all('*.js', function(req, res, next){
		res.header('Cache-Control', 'public, max-age=86400');
		next();
	})

	swc.app.all('*.css', function(req, res, next){
		res.header('Cache-Control', 'public, max-age=86400');
		next();
	})

	swc.app.use(bodyParser.urlencoded({extended: false}));
	swc.app.use(bodyParser.json({"limit":"10000kb"}));
	swc.app.use(session({
		secret: 'secret', 
		cookie: {
			maxAge: 60000
		},
		saveUninitialized: true,
		resave: false,
	}));

	return swc;
}

/**
* 初始化swc
*/
async function init(){
	//初始化控制台输出
	var swc = {
		/**
		* 服务器模式
		* @param dev :开发 (默认)
		* @param prod:生产
		*/
		mode : 'dev',

		/**
		* 控制台IO接口
		* 输入规范: `${操作}:${内容}`
		*/
		log : {
			cutMsg : function(msg){
				if(msg.indexOf(':') < 0){
					return ['', msg];
				}
				var data = [];
				data[0] = msg.substring(0, msg.indexOf(':'));
				data[1] = msg.substring(msg.indexOf(':') + 1, msg.length);
				return data;
			},
			info : function(msg){
				var data = swc.log.cutMsg(msg);
				console.log(new Date() + '\033[42;37m√ => ' + data[0] + ' :\033[0m ' + data[1]);
			},
			error : function(msg){
				var data = swc.log.cutMsg(msg);
				console.log(new Date() + 'x => \033[41;37m ' + data[0] + ' :\033[0m' + data[1]);
			}
		},

		/**
		* 进程参数
		* @param -m : 服务器模式
		* @param -c : 进程数
		* @param -syncdb : 是否同步数据库
		*/
		argv : await getArgv(),

		/**
		* )http service by express
		* 需要被控制器注册路由
		*/
		app : express(),

		/**
		* dao
		* 旧版本这个是db
		*/
		dao : {
			seq : {},
			models : {}
		},

		/**
		* 业务对象
		*/
		models : {},

		/**
		* 业务中间件，手动注册去吧。
		*/
		middlewares : {
			// authAdmin : require(`${__dirname}/../../middlewares/authAdmin`),
			// authWechat : require(`${__dirname}/../../middlewares/authWechat`),
		},

		/**
		* 抽象底层工具库
		*/
		utils : {
			image : require(`${__dirname}/../../utils/image`),
			base64 : require(`${__dirname}/../../utils/base64`),
			sortDic : require(`${__dirname}/../../utils/sortDic`),

			weibo : require(`${__dirname}/../../utils/weibo/util`),
			web : require(`${__dirname}/../../utils/web/util`)
		},

		/**
		* 服务
		*/
		services : {

		},

		/**
		* 统一错误入口
		*/
		Error : require(`${__dirname}/../status/error`),

		/**
		* 控制器载入接口
		*/
		registerHttpService : require('./registerHttpService'),
		registerMiddleware : require('./registerMiddleware'),
		registerGlobalData : require('./registerGlobalData'),
		registerMysqlDao : require('./registerMysqlDao'),
		registerService : require('./registerService'),
		registerStatic : require('./registerStatic'),
		registerModel : require('./registerModel'),
		registerDao : require('./registerDao'),
	}

	swc = await loadConfig(swc);
	swc.log.info('载入:配置');
	swc = await loadExpressMiddlewares(swc);
	swc.log.info('载入:express中间件');

	swc.startup = async function (swc){
		swc.app.listen(swc.config.server.port, ()=>{
			swc.log.info(`启动:端口监听${swc.config.server.port}`);
		})
	}
	return swc;
}

module.exports = init;