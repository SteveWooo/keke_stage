module.exports = {
	startup : require('./startup'),
	server : {
		socketInit : require('./server/socketInit'),
		send : require('./server/send'),
	},
	socket : undefined ,

	handles : {
		/**
		* 请求区块变更，若本地未更新到对方最新，对方会报错
		*/
		dnsChange : require('./handle/dnsChange'),

		/**
		* 请求区块同步
		*/
		dnsSync : require('./handle/dnsSync'),
	}

}