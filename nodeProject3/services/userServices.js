const { readDataAsync } = require("../utils/fileHelperAsync");
const path = require("path");
const usersPath = path.join(__dirname, "../users.txt")
const tasksPath = path.join(__dirname, "../tasks.txt")


const getUsers = async () => {
    return await readDataAsync(usersPath);
}

const getUserById = async (id) => {
    const users = await getUsers()
    // Check if filters via query params
    return users.find((user) => user.id == Number(id));
};

module.exports = {getUsers, getUserById}