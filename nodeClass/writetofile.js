const fs = require('fs')

fs.writeFile('file.txt', 'this is the first write to the back', function(err, data){
    if(err){
        console.log(err)
        return
    }
    console.log("Data entered successfully")
})

fs.appendFile('file.txt', 'this is the second write to the back\n', function(err){
    if(err){
        console.log(err)
        return
    }
    console.log("Data entered successfully")
})