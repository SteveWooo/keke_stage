/**
* @param msg
* @param address
* @param port
*/
module.exports = async function(swc, options){
	swc.services.rootUnion.socket.send(options.msg,
		options.address,
		options.port, (err)=>{
			swc.log.error(err.message);
		});

	return ;
}