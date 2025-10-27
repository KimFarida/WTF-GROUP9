// let newCars = require('./script.js')
// console.log(newCars.cars)

// let person = {
//     first_name: "Farida",
//     last_name: "Momoh"
// }


// function fName(){
//     console.log("Function Decleration 1")
// }

// const cFname = function(){
//     console.log("Function Decleration 2")
// }

// const aFname = ()=>{
//     console.log("Function Decleration 3")
// }

// fName()
// cFname()
// aFname()


// importing a module 
const fs = require('fs')
setTimeout(function(){
    console.log("Reading File")
}, 5000)
const data = fs.readFileSync('file.txt', 'utf-8')
console.log(data)

fs.readFile('files/calls.txt', 'utf-8', function(err, data){
    if(err){
        console.error(err.path)
        return
    }
   
    console.log(data)
})

