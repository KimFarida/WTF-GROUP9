const http = require('http')
const url = require('url')
const gradeServices = require('./services/gradeServices')

const server = http.createServer(async (req, res)=>{
    const parsedUrl = url.parse(req.url, true)
    const id = parsedUrl.pathname.split('/')[2]
    const query = parsedUrl.query
    
    if(!id && !query){
        res.writeHead(200, {'Content-Type':'application/json'})
        res.write(JSON.stringify({'message': "NO ID or FILTER"}))
        res.end()
    }

    let grade;

    if(id){
        let student = await gradeServices.getStudentById(id)
        let courses = student.courses
        let keys = Object.keys(courses)
        let allCourseData = []

    
        for(let i=0; i <keys.length; i++){
            let key = keys[i]
            let testScores = courses[key]
            let average = gradeServices.totalAverage(testScores)
            let grade = gradeServices.assignGrade(average)
            
            let courseData = {}
            courseData["name"] = key
            courseData["average"] = average
            courseData["grade"]  = grade

            allCourseData.push(courseData)

        }

        res.writeHead(200, {'Content-Type':'application/json'})
        res.write(JSON.stringify({'data': {"name":student.name, "courses":JSON.stringify(allCourseData)}}))
        res.end()

    }

})

server.listen(5000)