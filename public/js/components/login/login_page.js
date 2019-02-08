Vue.component("login", {
	data : function(){
		return {
			login : vue.global.pages.login
		}
	},
	methods : {
		init : function(){
			var scope = vue.global.pages.login;
			scope.form_data.account = "";
			scope.form_data.password = "";
		},

		submit_login : function(){
			var scope = vue.global.pages.login;
			$.ajax({
				url : vue.global.config.base_url + "/api/m/admin/login",
				type : "post",
				headers : {
					'Content-Type' : "application/json"
				},
				xhrFields: {withCredentials: true},
				data : JSON.stringify(scope.form_data),
				success : function(res){
					res = vue.global.common.res_handle(res);
					if(res.status != "2000"){
						alert(res.error_message);
						return ;
					}
					vue.global.common.controllers.alert.show_alert({
						message : "登陆成功"
					})
					location.hash = "category";
					// location.reload();
				}
			})
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
			<v-text-field
				v-model="login.form_data.account"
				label="Account"
				required
			></v-text-field>
		<v-flex>
		<v-flex xs12>
			<v-text-field
				v-model="login.form_data.password"
				label="password"
				required
				type="password"
			></v-text-field>
		<v-flex>
		<v-flex xs12 class="text-xs-center">
			<v-btn 
				color="blue primary"
				@click="">
				登陆
			</v-btn>
		<v-flex>
	</v-layout>
</v-container>
`

})