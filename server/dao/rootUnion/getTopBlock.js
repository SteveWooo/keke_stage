const fs = require('fs');

module.exports = async function(swc, options){
	var topBlock = fs.readFileSync(`${__dirname}/../../../../${swc.config.rootUnion.zoneFilePath}/blockchain/topBlock.json`).toString();
	topBlock = JSON.parse(topBlock);
	return parseInt(topBlock);
}