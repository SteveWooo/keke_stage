/**
* @param.username
* @param.password
*/
const request = require('request');

function getSt(swc, options){
	return new Promise(resolve=>{
		var option = {
			url : 'https://weibo.cn/',
			headers : {
				'cookie' : 'SUB=' + options.sub
			}
		}

		request(option, function(err, res, body){
			var stSource = body.substring(body.indexOf('/mblog/sendmblog?st='));
			var st = stSource.substring(stSource.indexOf('st=') + 3, stSource.indexOf('"'));
			resolve(st);
		})
	})
}

function getCookie(swc, options){
	return new Promise(resolve=>{
		var option = {
			url : options.loginResult.data.loginresulturl
		}

		request(option, function(err, res, body){
			var cookies = res.headers['set-cookie'];
			var sub;
			for(var i=0;i<cookies.length;i++){
				if(cookies[i].substring(0, 3) === 'SUB'){
					sub = cookies[i].substring(4, cookies[i].indexOf(';'));
					break;
				}
			}

			resolve(sub);
		})
	})
}

function login(swc, options){
	return new Promise(resolve=>{
		var body = {
			username : options.username,
			password : options.password,
		}

		var bodyData = [];
		for(var i in body){
			bodyData.push(`${i}=${body[i]}`);
		}

		var option = {
			url : 'https://passport.weibo.cn/sso/login',
			form : bodyData.join('&'),
			headers : {
				'referer' : 'https://passport.weibo.cn/signin/login?entry=mweibo&r=https%3A%2F%2Fweibo.cn%2F&backTitle=%CE%A2%B2%A9&vt=',
				'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
			}
		}


		request.post(option, function(err, res, body){
			if(err || res.statusCode != 200){
				swc.log.error(`${options.username} login failed. retrying`);
				resolve(undefined);
				return ;
			}
			body = JSON.parse(body);
			setTimeout(()=>{
				resolve(body);
			}, 1000);
			
		})
	})
}

module.exports = async function(swc, options){
	while(!options.loginResult || options.loginResult.retcode != '20000000') {
		options.loginResult = await login(swc, options);
	}

	options.sub = await getCookie(swc, options);
	options.st = await getSt(swc, options);

	swc.log.info(`Login success -- ${options.username}`);

	return {
		username : options.username,
		sub : options.sub,
		st : options.st,
		uid : options.loginResult.data.uid
	}
}