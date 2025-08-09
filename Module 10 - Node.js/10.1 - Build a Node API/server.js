import http, { get } from 'node:http'

const PORT = 4500
import { getDataFromDB } from './database/db.js'
const server = http.createServer( async (req , res) => {
    const destinations = await getDataFromDB()
    console.log(destinations)
    if (req.url ==="/api") {
        res.write("Access Granted\n")
        switch (req.method) {
            case 'GET':
                /*
                    Challenge:
                    1. Access the ‘setHeader’ method on the response object and pass in two strings to set the      
                    Content-Type to ‘application/json’ - watch out for casing! 
                */  
                res.setHeader("Content-Type", "application/json")
                res.write('You have found the cheese\n')
                res.write(JSON.stringify(destinations))
                break
            default:
                res.write('no cheese for you')
        }
    } 
    res.end()
})

server.listen(PORT, () => console.log(`server running on port ${PORT}`))