/**
* @param config.canvasId 目标画布id
*/
keke.Sticker = function(config){
	var that = this;
	this.config = config;
	var controllers = {};
	var models = {};

	models.canvas = undefined; //画布实例
	models.ctx = undefined; //画布handle
	models.info = {}; //当前表情的配置，可以直接拿出去给外面动态绑定，不需要跨接口。

	function init(){
		/**
		* 初始化画布
		*/
		that.models.canvas = document.getElementById(that.config.canvasId);
		that.models.ctx = that.models.canvas.getContext('2d');
	}
	init();

	/**
	* 外部接口
	*/

	/**
	* 加载图片
	* @param imageUrl 直接从origin sticker或者sticker中取出来就行了
	* @return imageId 图片会弄到一个隐藏dom里面去，会返回这个隐藏dom的id给业务，格式：sticker_img_${imageurl}
	*/
	controllers.loadImage = function(options, callback){

	}

	 /**
	 * 加载表情配置
	 * @param info[] 表情配置数组
	 * @param infoIndex 具体取哪个配置出来 默认0
	 * @return status 状态码
	 */
	controller.loadInfo = function(options, callback){

	}

	/**
	* 获取当前配置
	* 原路返回当前info，因为info被外面动态绑定了，所以要拿出来
	* 为了统一格式，全部用数组
	*/

	controller.getInfo = function(options){
		var result = [];
		result.push(models.info);
		return result;
	}


	/**
	* 对外配置
	*/
	this.models = models;
	for(var i in controllers){
		this[i] = controllers[i];
	}

	return this;
}