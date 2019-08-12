/**
* 为了防止敏感信息存在返回包中，需要对每个返回包的返回字段做一个统一输出
* 这个方法的作用就是输入一个返回包（或者一个对象），然后再输入另一个对象，用于筛选
* @param.response
* @param.filter
*/

/**
* filter demo : 
{
	name : 'text',
	theme : {
		theme_id : 'text'
	}
}
*/

async function getResponse(swc, options, result){
	for(var i in options.filter){
		if(typeof options.filter[i] == 'object'){
			result[i] = await getResponse(swc, {
				response : options.response[i],
				filter : options.filter[i]
			}, {});
		} else {
			result[i] = options.response[i];
		}
	}

	return result;
}

module.exports = async function(swc, options){
	var result = await getResponse(swc, {
		response : options.response,
		filter : options.filter,
	}, {});

	return result;
}