# vue-template-v2

## 关于登录

新系统的client_id、client_secret、grant_type需要在src/api/common.js中设置
账号：template
密码：123456

## 用户模块

创建新系统后需要在src/api/system.js文件中修改apiRouter变量

## 关于分支

请不要在master分支上进行开发！单人项目可在dev分支开发，多人合作项目需要从dev拉分支进行开发，分支名为自己名字缩写

## 模块化

尽量把代码模块化，常量抽离、接口地址抽离、组件抽离等，精简每个文件的代码行数，不要出现单个文件好几百行甚至上千行

## 自定义指令

- v-Int 只能输入纯数字
- v-Price 只能输入数字且最多保留两位小数

## TODO

- 用户模块接口对接
- 二维码生成、下载弹窗
- excel解析、生成、下载
- 导入导出
