const http = require('http')
const express = require('express')

// 当前 http 请求的实例
const app = express()

app.use((req, res, next) => {
    console.log('请求开始....', req.method, req.url)
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
    console.log('处理 /api路由')
    next()
})

app.get('/api', (req, res, next) => {
    console.log('get /api路由')
    next()
})

app.post('/api', (req, res, next) => {
    console.log('post /api路由')
    next()
})

app.get('/api/get-cookie', (req, res, next) => {
    console.log('get /api/get-cookie')
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.post('/api/get-post-data', (req, res, next) => {
    console.log('post /api/get-post-data')
    res.json({
        errno: 0,
        data: req.body
    })
})

app.use((req, res, next) => {
    console.log('处理 404')
    res.json({
        errno: -1,
        data: '404 not fount'
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})
