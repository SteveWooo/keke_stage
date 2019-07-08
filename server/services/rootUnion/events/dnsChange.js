/**
* 接收到dnschange请求，确认编号是最新编号+1后：
* 如果消息来源节点是请求block的所有者，那么就转发这条修改信息到所有节点。
* 如果消息来源节点不是请求block的所有者，那么就把这条更新写入本地preBlock。
* @param source = {msg, info}
*/
module.exports = async function(swc, options){
	
}