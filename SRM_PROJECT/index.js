const {readFile} = require("./utils/fileHelper")
const {totalAverage, assignGrade} = require("./services/gradeServices")

const filePath = "./records.txt"


/*
{
        "id" : 3,
        "name": "Paraclete Ebubeze",
        "courses": {
            "Javascript" : [80, 81, 63,  85], 
            "Database": [83, 85, 67, 90],
            "HTML": [43, 55, 77, 50],
            "CSS": [83, 85, 67, 90]
        }
},
*/
const testData = async(filePath)=>{
    // All students we have in our storage
    const students = await readFile(filePath)

    for (let i = 0; i < students.length; i++){
        // Becasue we are getting all course per student object
        //L1 -> Get the indivisual student object
        let student = students[i];

        //L2 -> courses object
        let coursesPerStudent = student.courses
        // We need to get the key for all indivisual course
        courseKeys = Object.keys(coursesPerStudent)

        console.log(`NAME: ${student.name}`)

        // L3 -> Gets us indivisual course by looping
        for(let j=0; j < courseKeys.length; j++){

            // Get the list of test scores  for each course i.e HTML, CSS etc
            let courseName = courseKeys[j]
            //L4
            let courseTestScores = coursesPerStudent[courseName]
            
            // Finds the average score per course
            let average = totalAverage(courseTestScores)

            // Assigns a grade
            let grade = assignGrade(average)
            console.log(`COURSE: ${courseName} AVERAGE: ${average}, GRADE: ${grade}`)
        }
        console.log("\n")
        
    }
}

testData(filePath)

