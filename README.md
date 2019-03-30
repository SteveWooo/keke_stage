# keke脚手架
***
### 简述：
keke脚手架，用于搭建前后端彻底分离的web服务

***
### 外部工具引用：
1. vue.js
2. vuetify.js
3. express.js
4. requelize.js
5. mysql

***
### 配置入口
1. 服务端配置入口 : /conf/config.json (config.prod.config为生产模式)
2. 后台前端配置入口 : /admin/config.json

***
### 启动： 
1. 服务启动：node startup.js(-m dev或prod, 开发模式或生产模式)(-db 1或0，是否让orm同步数据库)
2. 创建管理员：cd autoTools & node createAdmin(默认账号,密码：admin,123456)
3. 后台：localhost:81/admin/index.html#login
4. 数据库orm模型：server/middlewares/common/db.js