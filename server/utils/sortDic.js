/**
* @param.query = {}, 参数hash表
*/
module.exports = async function (swc, options){
	var query = options.query;
	var result = [];
	for(var key of Object.keys(query).sort()){
		result.push(`${key}=${query[key]}`);
	}
	return result;
} 