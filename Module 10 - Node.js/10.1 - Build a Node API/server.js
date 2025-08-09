import http from 'node:http'

const PORT = 4500

const server = http.createServer((req , res) => {
    if (req.url ==="/api") {
        res.write("Access Granted\n")
        switch (req.method) {
            case 'GET':
                res.write('You have found the cheese')
                break
            default:
                res.write('no cheese for you')
        }
    } else {
        
    }
    res.end()
})

server.listen(PORT, () => console.log(`server running on port ${PORT}`))