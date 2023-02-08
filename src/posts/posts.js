const jsonServer = require('json-server')
const common = require('../common')

// convert pagination key name
exports.convertPaginationKey = (req, res, next) => {
    if ('page' in req.query) {
        req.query._page = req.query.page;
    }
    if ('limit' in req.query) {
        req.query._limit = req.query.limit;
    }
    next();
};

// posts
const router = jsonServer.router('src/posts/db.json')
router.render = function (req, res) {
    const params = new URLSearchParams(req._parsedUrl.query);
    const limit = params.get('limit')
    let hasNextPage;
    if (limit) {
        hasNextPage = res.locals.data.length >= limit;
    }
    res.send({
        ...common.successOrNg,
        ...common.errorResponse,
        ...common.paginationResponse(hasNextPage, params.get('page')),
        "posts": res.locals.data
    })
}
exports.router = router
