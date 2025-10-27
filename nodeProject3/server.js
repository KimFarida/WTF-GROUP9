const http = require('http');
const url = require('url');
const { routes } = require('./routes/index');

const server = http.createServer(async(req, res)=>{
    const parsedUrl = url.parse(req.url, true); 
    const query = parsedUrl.query; // object
    const path = parsedUrl.pathname; //  /users
    const method = req.method.toUpperCase(); // get  -> GET

    let handler = routes[path] && routes[path][method] // -> /users && 


    // users/3 /user/4
    if (!handler){
        // Get all routes than handle dynamic params ie /users/:id, /products/:id, students/:id

        const routeKeys = Object.keys(routes).filter((key)=> key.includes(":"))

        // Find a routeKey that matches the path /users/:id
        const matchedKey = routeKeys.find((key)=>{
            // Replace everything after :/ with a capture group ([^/]+)
            // all /users/:id become  ^/user/([^/]+)$ 
            const regex = new RegExp(`^${key.replace(/:[^/]+/g, "([^/]+)")}$`);

            // If it matches the path, return the key
            return regex.test(path)
        });

        // if I get a matchedKey
        if (matchedKey){

            // match path against the dynamic Route
            const regex = new RegExp(`^${matchedKey.replace(/:[^/]+/g,"([^/]+)")}$`);

            // Execute the regex use it to get the param from the actual path users/123, get 123
            const dynamicParams = regex.exec(path).slice(1);

            // Since a route,use it to get handler function
            const dynamicHandler = routes[matchedKey][method];

            // match - > find all segments in matchKey starting with ":"
            //(e.g., :id, :userName in /users/:id/name/:userName)
            // map -> for all keys that match, remove the ":"
            // by mapping we get id, username 
            const paramKeys = matchedKey.match(/:[^/]+/g).map((key) => {
                return key.substring(1);
            })
            

            const params = dynamicParams.reduce((acc, val, i) => ({...acc, [paramKeys[i]]: val}), {});

            //assign to request body
            req.params = params;
            console.log(req.params)

            // get handler
            handler  = dynamicHandler;
        }

    };

    if (handler){
        //set query 
        req.query = {}

        for (const key in query){
            req.query[key] = query[key];
        }
        try {
            handler(req, res)
        } catch (error) {
            console.error(`ERROR: ${error}`)
            res.writeHead(500, {"content-type": "application/json"});
            res.end(JSON.stringify({message:"An error occured"}));
        }
    }
    else{
        res.writeHead(404, {"content-type": "application/json"});
        res.end(JSON.stringify({message:"ROUTE NOT FOUND"}));
    }
})

server.listen(5000);