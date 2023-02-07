const jsonServer = require('json-server')
const server = jsonServer.create()

// constants
const suffixApi ='/api'
const posts = 'posts'
const jsonFileName = 'posts.json'

// common response
const successOrNg = {
    "result": "OK"
}
const errorResponse = {
    "error": { "code": "001", "message": "error message" },
}
const paginationResponse = (hasNextPage, currentPage) => {
    if (hasNextPage === undefined || currentPage === undefined) return {}
    return {
        "hasNextPage": hasNextPage,
        "currentPage": Number(currentPage),
    }
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
    const params = new URLSearchParams(req._parsedUrl.query);
    const limit = params.get('limit')
    let hasNextPage;
    if (limit) {
        hasNextPage = res.locals.data.length >= limit;
    }
    res.send({
        ...successOrNg,
        ...errorResponse,
        ...paginationResponse(hasNextPage, params.get('page')),
        "posts": res.locals.data
    })
}

server.listen(3000, () => {
    console.log('JSON Server is running')
})
