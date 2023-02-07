const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

const suffixApi ='/api'

function commonResponse(req, res) {
    // APiで共通のレスポンスを定義する
    const commonResponse = {
        "result": "OK",
        "error": { "code": "001", "message": "エラーメッセージ" },
    }
    res.send({
        ...commonResponse,
        ...res.locals.data
    })
}

// middlewares
server.use(middlewares)

// posts
const postsRouter = jsonServer.router('posts.json')
server.use(suffixApi, postsRouter)
postsRouter.render = commonResponse

server.listen(3000, () => {
    console.log('JSON Server is running')
})
