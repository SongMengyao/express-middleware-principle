const http = require('http')
// const express = require('express')  // 官网的 express
const express = require('./like-express/index.js')  // like express

// 当前 http 请求的实例
const app = express()

app.use((req, res, next) => {
    next()
})

app.use((req, res, next) => {
    // 假设处理cookie
    req.cookie = {
        userId: '123abc'
    }
    next()
})

app.use((req, res, next) => {
    // 假设处理 postdata
    // 异步处理
    setTimeout(() => {
        req.body = {
            a: 100,
            b: 200
        }
        next()
    })
})

app.use('/api', (req, res, next) => {
    next()
})

app.get('/api', (req, res, next) => {
    next()
})

app.post('/api', (req, res, next) => {
    next()
})

// 模拟登陆验证
function loginCheck () {
    setTimeout(() => {
        next()
    })
}

app.get('/api/get-cookie', (req, res, next) => {
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.post('/api/get-post-data', (req, res, next) => {
    res.json({
        errno: 0,
        data: req.body
    })
})

app.use((req, res, next) => {
    res.json({
        errno: -1,
        data: '404 not fount'
    })
})

app.listen(8000, () => {
    console.log('server is running on port 8000')
})
