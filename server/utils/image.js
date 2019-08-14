const crypto = require("crypto");
const fs = require("fs");
	
const IMAGE_HEADERS = {
	"data:image/png;base64" : "png", 
	"data:image/jpeg;base64" : "jpeg"
}

function getImageData (swc, options){
	const Image = require('images');
	return new Promise(resolve=>{
		var result = Image(options.dataBuffer).size();
		resolve(result);
	})
}

/*
* @param image图片base64
* @param filePath 保存到这个地方
* 保存文件到本地
*/
var saveImage = async function(swc, options){
	//取文件后缀
	var file_header = options.image.substring(0, options.image.indexOf(','));
	if(!(file_header in IMAGE_HEADERS)){
		return undefined;
	}
	var filename = crypto.createHash("md5").update(options.image).digest("hex");
	filename = filename + "." + IMAGE_HEADERS[file_header];

	options.image = options.image.replace(/^data:image\/\w+;base64,/, "");

	var data_buffer = Buffer.from(options.image, 'base64');

	// var imageData = await getImageData(swc, {
	// 	dataBuffer : data_buffer
	// });
	/**
	* 如果指定了保存目录，就保存过去。否则保存到默认服务器资源目录
	*/
	if(options.filePath){
		fs.writeFileSync(options.filePath + "/" + filename, data_buffer);
	} else {
		fs.writeFileSync(swc.config.server.base_res_path + "/" + filename, data_buffer);
	}
	return {
		filename : filename,
		// width : imageData.width,
		// height : imageData.height
	}
}

exports.saveImage = saveImage;