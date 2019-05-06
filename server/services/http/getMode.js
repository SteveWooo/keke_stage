/*
* @param 返回当前服务器环境
*/
module.exports = {
	config : {
		path : '/api/p/mode/get',
		method : 'get',
		middlewares : [],
		model : {
			code : 2000,
			mode : '',
			source : {}
		}
	},
	service : async (req, res, next)=>{
		req.response.mode = req.swc.mode;
		next();
	}
}