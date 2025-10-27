const { error } = require("console")

const users = null //'{"name": "Dami","gender":"female"}'

const p = new Promise(function(res, rej){
    if(users){
        res(users)
    }
    else{
        rej("No data found")
    }

})


p.then(function(data){
    console.log(data)
}).catch((err)=>{
    console.log(err)
})

console.log("Last")