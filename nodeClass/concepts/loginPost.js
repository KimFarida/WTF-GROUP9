// all about GET
const http = require('http');
const Url = require('url')
const Qs = require('querystring')



const server = http.createServer(function(req, res){
    let dt = ''
    req.on("data", function(chunk){
        dt += chunk
    })

    req.on('end', function(){
        const data = Qs.parse(dt)
        console.log(data)
    })




}).listen(3000)