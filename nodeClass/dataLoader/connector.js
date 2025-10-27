fs = require('fs')
const users = fs.readFileSync('data.json', 'utf-8')
const courses = fs.readFileSync('courses.json', 'utf-8')
module.exports = {users, courses}
