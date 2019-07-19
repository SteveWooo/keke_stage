keke.models.stickerCategory = {
	config : {
		name : "stickerCategory",
		pathName : "sticker_category",
		idName : "sticker_category_id",
	},
	datas : {
		pageNow : 1, //当前页面
		itemPerPage : 10, //每页加载的数量
		loading : false, //加载状态栏
		list : [], //数据列表
		count : 0, //总数
		//列表头名字
		itemHeader : [{
			text : "封面图",
			sortable : false
		},{
			text : "表情库名称",
			sortable: false,
		},{
			text : "简述",
			sortable : false
		}, {
			text : "操作",
			sortable : false
		}]
	},
	panels : {
		add : {
			show : false,
			editor : undefined,
			form : {
				title : '',
				description : '',
				icon_image : '',
			}
		},
		update : {
			show : false,
			editor : undefined,
			selfServiceId : '',
			form : {
				title : '',
				description : ''
			}
		}
	}
}