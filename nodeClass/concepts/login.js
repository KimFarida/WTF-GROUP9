// all about GET
const http = require('http');
const Url = require('url')
const Qs = require('querystring')
const server = http.createServer(function(req, res){
    const parsedUrl = Url.parse(req.url, true)
    const query = parsedUrl.query
    

    console.log(query)
    res.write(`Welcome ${query.username}`)
    res.end()


}).listen(3000)