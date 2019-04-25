# keke脚手架
***
### 简述：
web脚手架

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
2. 后台前端配置入口 : ${staticpath}/conf/config.json

***
### 启动： 
1. 服务启动：node startup.js
2. 进程参数
```
@param -m : 服务器模式
@param -c : 进程数
@param -syncdb : 同步模型到数据库
```