const jsonServer = require('json-server')
const server = jsonServer.create()
const posts = require('./posts/posts')


server.get("/api/posts", posts.convertPaginationKey);
server.use("/api/", posts.router)

server.use(jsonServer.rewriter({
    "/api/user/**": "/api/",
}))

server.listen(3000, () => {
    console.log('JSON Server is running')
})
