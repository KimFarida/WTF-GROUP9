const data = require('./connector.js');
let users = JSON.parse(data.users)["users"];
const http = require('http');
const _url = require('url');


const server = http.createServer(function(req, res){
    let url = _url.parse(req.url, true)
    let query = url.query

    res.writeHead(200, {'content-type':'application/json'})

    if (url.pathname == '/users'){

        if (query === null){
            res.write(users)
        }
        else{
                //Improvement for multiple queries 
                if ("userid" in query){
                    let id = query.userid
                    for(let i = 0; i < users.length; i++){
                        if (users[i]["userid"] == id){
                            res.write(JSON.stringify(users[i]))
                            break
                        }
                    }
                }
                else{
                    res.write('INVALID QUERY')
                }
            

        }

    }

    res.end()
})

server.listen(5000);