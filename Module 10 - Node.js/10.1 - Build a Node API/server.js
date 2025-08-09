import http from 'node:http'

const PORT = 4500

const server = http.createServer((req , res) => {
    if (req.url ==="/api") {
        res.end("Access Granted")
    }
})

server.listen(PORT, () => console.log(`server running on port ${PORT}`))