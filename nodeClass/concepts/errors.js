try{

const newData = JSON.parse(users)
if(!newData.age){
    throw "new Error Message"
}
}catch(err){
console.log("Error in loading Data") // message to the user
console.log( "incoming Error message",err) // fs to the coder
}finally{
    console.log("run regardless")
}
 

function Car(make, model, year, colour){
    this.make = make
    this.model = model
    this.year = year
    this.colour = colour
    this.distance = 600
    this.time = 60
    this.speed = ()=>{
        return this.distance/this.time
    }
}


// Promises take a call back function
let p = new Promise(function(resolve, reject){
    resolve("All done")
})
console.log(p)
console.log("My gender")
// .then() ->. if promise resolved, do something with it in the call back function
// console.log(p.then(function(mess){
//     console.log(mess)
// }))