Vue.component("stickerCategory", {
	data : function(){
		return {
			data : vue.global.pages.stickerCategory, //数据流载入
			utils : vue.global.common.utils.actions, //工具注入
		}
	},
	methods : {
		init : function(){
			var scope = vue.global.pages[this.data.config.name];
			var that = this;
		}
	},
	mounted : function(){
		this.init();
	},
	template : 
`
<v-container>
	<v-layout row wrap>
		<v-flex xs12>
			{{data.config.name}}
		</v-flex>
	</v-layout>
</v-container>
`
})