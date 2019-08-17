# express-middleware-principle
简单描述express框架中间件的原理，虽然没有官网封装的那么详细，但是不影响正常使用，简单的逻辑还是有的。

## 官网 express 使用步骤
- 初始化 npm init -y
- 安装 express npm i express
- 启动 node express-demo.js

## like-express 使用步骤
- 引入 like-express/index
- 启动 node express-demo.js

## express-demo && express-demo-copy
    
      调试like-express，发现之前写的 express-demo 有bug，不能直接写app.get，app.post之类的，所以copy了一份单独调试了。也可能是中间件原理写的有一点问题。待续...
