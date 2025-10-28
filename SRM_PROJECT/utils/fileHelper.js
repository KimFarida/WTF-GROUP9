// Create a async function that uses fs module and  should take in a filepath
const fst = require('fs/promises')


async function readFile(filepath){
    // We should be able to read the file from the file path
    const data = await fst.readFile(filepath, 'utf-8')

    // convert the json string to a Json object
    const dataToJson = JSON.parse(data)

    // return to the function that called it
    return dataToJson
}

module.exports = {readFile};




