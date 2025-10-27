const http = require('http');
const _url = require('url');

const server = http.createServer(function(req, res){
    const nUrl = _url.parse(req.url, true);
    console.log(nUrl)
    console.log(nUrl.pathname);

    res.end("page loaded");
})

server.listen(5000);

// Assignment; using query, get the id and retriever a record from  the fonnetor