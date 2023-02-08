const jsonServer = require('json-server')
const server = jsonServer.create()
const posts = require('./posts/posts')

// convert pagination key name
server.get("/api/posts", posts.convertPaginationKey);
server.use("/api", posts.router)

server.listen(3000, () => {
    console.log('JSON Server is running')
})
