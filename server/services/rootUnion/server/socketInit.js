const dgram = require('dgram');

/**
* 创建UDPsocket
*/
module.exports = async function(swc, options){
	var socket = dgram.createSocket('udp4');
	socket.on('error', async (err)=>{
		swc.log.error(err.message);
	})

	socket.on('message', async (msg, info)=>{
		msg = JSON.parse(msg);
		console.log(msg);
	})

	socket.on('listening', async ()=>{
		const address = socket.address();
		swc.log.info(`root union服务监听于 ${address.port} 端口`)
	})

	socket.bind(swc.config.rootUnion.union[swc.config.rootUnion.name].port);
	swc.services.rootUnion.socket = socket;

	return swc;
}