
const fs = require('fs')
fs.readFile('./data.txt', 'utf-8', (err, data)=>{
    console.log(JSON.parse(data))
    return
})


