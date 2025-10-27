const fs = require("fs/promises");
const path = require("path");

// const filePath = path.join(__dirname, "../users.txt")

const readDataAsync = async (filePath) => {
    console.log("File Path:", filePath);  
    try {
        const data = await fs.readFile(filePath, 'utf-8')
        const parsed = JSON.parse(data);
        return parsed;
    }
    catch (error) {
        console.error("Error reading file:",error)
    }
    return [];
}


//Write asynchronously to users.txt
const writeDataAsync = (filePath, data) => {
    return fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};


module.exports = {writeDataAsync, readDataAsync};