# omicro-cli
创建obvious前端微服务的脚手架工具

## 使用
- **全局安装脚手架**
    ```
    npm install -g @runnan/omicro-cli
    ```
- **创建项目**
    - 执行`omicro init`
    ![](https://user-gold-cdn.xitu.io/2020/5/23/1723d458c29ec559?w=840&h=123&f=png&s=27473)
    ![](https://user-gold-cdn.xitu.io/2020/5/23/1723d4597b76aba8?w=642&h=97&f=png&s=12061)
    - 生成的项目结构：
        ```
        |--serviceName@version
            |--dist：生产环境代码（自动生成）
            |--mock: 用于mock其他前端微服务和平台html的代码，方便开发调试
            |--typings: typescript声明文件
            |--script: 构建辅助代码
            |--src: 微服务业务代码
            |--eslint/webpack/jest等配置文件
            |--omicro.config.json：feda的资源声明配置文件
        ```
    - 执行`npm start`，启动样例工程：
        ![](https://user-gold-cdn.xitu.io/2020/5/24/17247686e5779ccf?w=2160&h=936&f=png&s=60694)
- **打包生产环境代码**
    - 执行`npm run build`: 代码被打包到dist目录，且构建脚本自动把静态资源信息在`omicro.config.json`中注册：
    ```
    {
        "name": "normal-app@1.0.0",
        "assets": {
            "css": [
                "entry.1ffa7be5.css"
            ],
            "js": [
                "entry.8f02d439.js"
            ]
        }
    }
    ```
- **部署到Feda**
    - 在服务端部署[Feda](https://github.com/SMIELPF/feda)
    - 假设Feda被部署在https://feda.com, 执行`omicro deploy --agent https://feda.com`, 本微服务的前端静态资源和资源声明文件omicro.config.json将被打包发送到Feda，被部署到Nginx服务器上


## 工程模板

  - 语言：typeScript
  - 样式：less、css-module
  - 框架：obvious、react（可选）
  - 构建：webpack
  - 代码检查：eslint
  - 单元测试：jest

## omicro命令
Usage: omicro [Options] [Command]

Options:
- `-v, --version`: 查看版本号
- `-h, --help`: 查看帮助信息

Commands:
- `omicro init`: 初始化前端微服务开发模板
- `omicro list [options]`: 打印出所有Feda上已部署的前端微服务
    - -a, --agent < host >: 指定Feda所部署的服务端地址，默认是https://127.0.0.1:3000
- `omicro deploy [options]`: 把前端微服务部署到Feda
    - -a, --agent < host >: 指定Feda所部署的服务端地址，默认是https://127.0.0.1:3000
    - -c, --config < path >: 指定omicro.config.json的路径，默认是项目根路径

## 关联项目

  - [obvious](https://github.com/SMIELPF/obvious):轻量级的微前端框架
  - [react-obvious](https://github.com/SMIELPF/react-obvious): 结合react和obvious的类react-redux框架
  - [Feda](https://github.com/SMIELPF/feda): Front End Deploy Agent， 基于Node.js、Nginx、Docker技术构建的前端静态资源部署应用


