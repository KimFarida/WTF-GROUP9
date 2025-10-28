const {readFile} = require("../utils/fileHelper")
const path = require('path');

const HIGHESTSCORE = 100

const currFilePath = __filename
const filePath = path.join(currFilePath, '../../records.txt')

// If unsure how this works, just console log this point
//console.log(filePath)

const getStudents = async () =>{
    const students = await readFile(filePath)
    return students
}


const getStudentById = async (id)=>{
    const students = await getStudents()
    return students.find(s=> s.id == id)
}


// Calculate total score per course -> course -> list
const totalScore = (testScores)=>{
    let total = 0
    // Loops thru the grade array of test scores and add the value
    //  to our total
    for(let i=0; i<testScores.length; i++){
        total += parseFloat(testScores[i])
    }
    return total
};

// Convert to Percentage Score -> Total Average
const totalAverage = (testScores)=> {

    // to get All Courses A student Offers
    const numOfTests = testScores.length

    // To get Cummulative Best Score From Doing Test 
    const highestTotal = numOfTests * HIGHESTSCORE

    const score = totalScore(testScores)

    const totalAverage = Math.round((score/highestTotal) * 100)

    return totalAverage
}

const assignGrade = (totalAverage)=>{
    // >= 90 A
    // >= 80 B
    // >= 60 C
    // >= 50 D
    // >= 30 E
    // >= 0 F
    // 29 - 0
    if (totalAverage >= 0 && totalAverage < 30) {
        return "F"
    } else if(totalAverage >= 30 && totalAverage < 50){
        return "E"
    }
    else if(totalAverage >= 50 && totalAverage < 60){
        return "D"
    }
    else if(totalAverage >= 60 && totalAverage < 80){
        return "C"
    }
    else if(totalAverage >= 80 && totalAverage < 90){
        return "B"
    }
    else if(totalAverage >= 90 && totalAverage <= 100){
        return "A"
    }
    else{
        return null
    }

}

module.exports = {totalScore, totalAverage, assignGrade, getStudentById}




