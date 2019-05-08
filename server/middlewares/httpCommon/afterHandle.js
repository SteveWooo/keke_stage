/**
* 前置请求定义，注入模型
* @param.config 业务配置
*/
module.exports = async (swc, options)=>{
	return async function(req, res){
		if(req.response.sent === true){
			return ;
		}
		if(!req.response.responseHeaders || !('Content-Type' in req.response.responseHeaders)){
			res.header("Content-Type", "application/json; charset=utf-8")
		}
		for(var i in req.response.responseHeaders){
			res.header(i, req.response.responseHeaders[i]);
		}
		res.send(JSON.stringify(req.response));
	}
}