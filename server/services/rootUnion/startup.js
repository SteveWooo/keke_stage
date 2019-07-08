module.exports = async function(swc, options){
	await swc.services.rootUnion.server.socketInit(swc, {});
	await swc.services.rootUnion.server.loopInit(swc, {});
}