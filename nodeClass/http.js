// HTTP a protocol that runs on the server to allow communication
// Node js allows requests be processed asynchronously 
//Making node js a web server 
const http = require('http');
console.log(http)

// Create server -> Takes two arguements (req and res)
// Creater server is an object that has methods
// Listen takes in port number - this iis used to listen to outside communication
// can only use port numbers not in use
// object requires a call back function as a parameter
// error comes before data
const server = http.createServer(function (req, res){

})
server.listen(5000)
console.log("Web server has started")
