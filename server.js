const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use((req, res, next) => {
    next()
})

server.use(router)

router.render = function (req, res) {
    // APiで共通のレスポンスを定義する
    const commonResponse = {
        "result": "OK",
        "error": { "code": '001', "message": 'エラーメッセージ' },
    }
    res.send({
        ...commonResponse,
        ...res.locals.data
    })
}

server.listen(3000, () => {
    console.log('JSON Server is running')
})
