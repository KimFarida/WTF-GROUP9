const {readFile} = require("../utils/fileHelper")


const HIGHESTSCORE = 100

// Calculate total score per course -> course -> list
const totalScore = (course)=>{
    let total = 0
    // Loops thru the grade array of test scores and add the value
    //  to our total
    for(let i=0; i<course.length; i++){
        total += parseFloat(course[i])
    }
    return total
};

// Convert to Percentage Score -> Total Average
const totalAverage = (course)=> {

    // to get All Courses A student Offers
    const numOfCourses = course.length

    // To get Cummulative Best Score
    const highestTotal = numOfCourses * HIGHESTSCORE

    const score = totalScore(course)

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

module.exports = {totalScore, totalAverage, assignGrade}




