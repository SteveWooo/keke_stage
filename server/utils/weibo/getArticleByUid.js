/**
* @param.uid
* @param.page 页数， 默认1
*/
const request = require('request');
const fs = require('fs');
const Iconv = require('iconv-lite');
const cheerio = require('cheerio');
/**
* @param.userInfo 需要登陆才能拉列表
* @param.page
* @param.uid
*/

function parseArticleId(body){
	var articleIds = [];
	var MODEL = '<div class="c" id="M_';
	while(body.indexOf(MODEL) >= 0){
		body = body.substring(body.indexOf(MODEL) + MODEL.length);
		var id = body.substring(0, body.indexOf('"'));
		articleIds.push(id);
	}

	return articleIds;
}

function getArticleByPage(swc, options){
	return new Promise(resolve=>{
		var option = {
			url : `https://weibo.cn/${options.uid}/profile?page=${options.page == undefined ? '1' : options.page}`,
			headers : {
				'cookie' : 'SUB=' + options.userInfo.sub,
			},
			// encoding : null,
		}

		request(option, function(err, res, body){
			if(err || res.statusCode != 200){
				resolve(undefined);
				return ;
			}
			var articleIds = parseArticleId(body);
			resolve(articleIds);
		})
	})
}

module.exports = async function(swc, options){
	var userInfos = await swc.services.weibo.dao.getUserInfos(swc, {});
	var articleIds = await getArticleByPage(swc, {
		userInfo : userInfos[0],
		page : options.page,
		uid : options.uid
	})
	return articleIds;
}