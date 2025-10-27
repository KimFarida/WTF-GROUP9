const http = require('http');
const fs = require('fs')
// If import, will use cache 
const data = require('../../search_user/connector')

const server = http.createServer(function (req,res) {
    res.writeHead(200, {'content-type':'application/json'})


    if (req.url == '/users'){
        const users = fs.readFileSync('data.txt', 'utf-8')
        res.write(users);
    }

    if (req.url == '/admin'){
        const courses = fs.readFileSync('courses.json', 'utf-8')
        res.write(courses);
     
    }

    res.end()

})

server.listen(5000)