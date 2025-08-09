import http, { get } from 'node:http'

const PORT = 4500
import { getDataFromDB } from './database/db.js'
const server = http.createServer( async (req , res) => {
    const destinations = await getDataFromDB()

    if (req.url ==="/api") {
        
        switch (req.method) {
            case 'GET':
                /*
                    Challenge:
                    1. Access the 'statusCode' property and set it to 200.
                */
                res.statusCode = 200
                res.setHeader("Content-Type", "application/json")
                
                res.write('You have found the cheese\n')
                res.write(JSON.stringify(destinations))
                
                break
            default:
                res.statusCode = 404 // bad request status code
                res.setHeader('Content-Type', 'application/json')
                res.write('no cheese for you\n')
                
                const errorObject = {error: "not found", message: "The requested route does not exist"}
                res.end(JSON.stringify (errorObject))
        }
    } 
    res.end()
})

server.listen(PORT, () => console.log(`server running on port ${PORT}`))