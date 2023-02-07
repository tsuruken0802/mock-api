const jsonServer = require('json-server')
const server = jsonServer.create()

// constants
const suffixApi ='/api'
const posts = 'posts'
const jsonFileName = 'posts.json'

// common response
const commonResponse = {
    "result": "OK",
    "error": { "code": "001", "message": "error message" },
}

// convert pagination key name
server.get(suffixApi + '/' + posts, (req, res, next) => {
    if ('page' in req.query) {
      req.query._page = req.query.page;
    }
    if ('limit' in req.query) {
        req.query._limit = req.query.limit;
    }
    next();
});

// posts
const postsRouter = jsonServer.router(jsonFileName)
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
