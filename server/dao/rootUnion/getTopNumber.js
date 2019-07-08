const fs = require('fs');

module.exports = async function(swc, options){
	var topFile = fs.readFileSync(`${__dirname}/../../../../${swc.config.rootUnion.zoneFilePath}/blockchain/topBlock.json`).toString();
	topFile = JSON.parse(topFile);
	return parseInt(topFile.number);
}