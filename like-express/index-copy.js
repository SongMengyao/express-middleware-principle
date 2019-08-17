const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
  constructor() {
    // 存放中间件列表
    this.routers = {
      all: [],
      get: [],
      post: []
    }
  }

  // 统一处理 use, get, post 等方法
  register(path) {
    const info = {}
    if (typeof path === 'string') {
      info.path = path
      // 从第二个参数开始转换为数组，存入 stack
      info.stack = slice.call(arguments, 1)
    } else {
      info.path = '/'
      // 从第一个参数开始转换为数组，存入 stack
      info.stack = slice.call(arguments, 0)
    }

    return info
  }

  use() {
    console.log('use this: ', this)
    console.log('use arguments: ', arguments)

    const info = this.register.apply(this, arguments)
    this.routers.all.push(info)

    console.log('use this.routers: ', this.routers)
  }

  get() {
    console.log('get this: ', this)
    console.log('get arguments: ', arguments)

    const info = this.register.apply(this, arguments)
    this.routers.get.push(info)

    console.log('get this.routers: ', this.routers)
  }

  post() {
    console.log('post this: ', this)
    console.log('post arguments: ', arguments)

    const info = this.register.apply(this, arguments)
    this.routers.post.push(info)

    console.log('post this.routers: ', this.routers)
  }

  match(method, url) {
    let stack = []
    console.log('match url: ', url)
    if (url === '/favicon.ico') {
      return stack
    }

    console.log('this.routers[method]: ', this.routers[method], method)

    // 获取 routes
    let curRoutes = []
    curRoutes = curRoutes.concat(this.routers.all)
    curRoutes = curRoutes.concat(this.routers[method])

    curRoutes.forEach(routeInfo => {
      if (url.indexOf(routeInfo.path) === 0) {
        console.log('routeInfo.path: ', routeInfo.path, url)
        stack = stack.concat(routeInfo.stack)
      }
    })
    return stack
  }

  // next 机制
  handle(req, res, stack) {
    const next = () => {
      // 拿到第一个匹配的中间件
      const middleware = stack.shift()
      if (middleware) {
        // 执行中间件函数
        middleware(req, res, next)
      }
    }
    next()
  }

  callBack() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-type', 'application/json')
        res.end(
          JSON.stringify(data)
        )
      }

      const url = req.url
      const method = req.method.toLowerCase()

      const resultList = this.match(method, url)
      this.handle(req, res, resultList)
    }
  }

  listen(...args) {
    const server = http.createServer(this.callBack())
    server.listen(...args)
  }
}

// 工厂函数
module.exports = () => {
  return new LikeExpress()
}
