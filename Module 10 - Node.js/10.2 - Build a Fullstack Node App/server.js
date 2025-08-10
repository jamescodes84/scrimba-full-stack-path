/*
Challenge: 

1.Set up a server that serves the string 
    '<html><h1>The server is working</h1></html>'.
    
    What should the content type be? 
    What status code should you send?

2. Listen on port 8000 and log a connection message to the console.

3. Open the browser to see your first served HTML.

*/

import http from 'http'
const PORT = 8000
const server = http.createServer((req, res) => {
    
    res.setHeader("Content-type", "text/html")
    res.write(`<html><h1>The server is working</h1></html>`)
})

server.listen(PORT , () => console.log(`server is listening on port ${PORT}`))