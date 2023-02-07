const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

// Path
const suffixApi ='/api'
const posts = 'posts'

// APIで共通のレスポンスを定義する
const commonResponse = {
    "result": "OK",
    "error": { "code": "001", "message": "エラーメッセージ" },
}

server.get(suffixApi + '/' + posts, (req, res, next) => {
    if ('page' in req.query) {
      req.query._page = req.query.page;
    }
    if ('limit' in req.query) {
        req.query._limit = req.query.limit;
    }
    next();
});

// middlewares
server.use(middlewares)

// posts
const postsRouter = jsonServer.router('posts.json')
server.use(suffixApi, postsRouter)
postsRouter.render = function (req, res) {
    res.send({
        ...commonResponse,
        "posts": res.locals.data
    })
}

server.listen(3000, () => {
    console.log('JSON Server is running')
})
