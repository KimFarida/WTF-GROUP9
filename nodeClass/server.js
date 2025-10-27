const fs = require('fs')

const http = require('http')
const server = http.createServer(function(req, res){
    const data = fs.readFileSync('./file.txt', 'utf-8')
    let sep = '{'
    // math- set
    // Find the index of the opening brace '{'

    let idxSep = data.indexOf(sep)
    let users = JSON.stringify(data.slice(idxSep))

    users = JSON.parse(users)
   

    // Writes the data response to page
    // res.write("<h1>First Server Running. <h1>");
    if (req.url === '/'){
        res.writeHead(200, {'content-type':'application/json'})
        res.write(JSON.stringify({mess:"Tech4Dev"}))
        //res.end()
    }else if (req.url == "/users"){
        res.writeHead(200, {'content-type':'application/json'})
        res.write(JSON.stringify(users))
        //res.end()
    }
    res.end()
    
})

server.listen(5000)

console.log("Server has started")