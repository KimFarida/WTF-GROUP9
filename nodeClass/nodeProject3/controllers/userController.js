const userService = require("../services/userServices");
const { writeDataAsync, readDataAsync } = require("../utils/fileHelperAsync");
const { getPostBodyAsync } = require("../utils/getPostBodyAsync")
const response = require("../utils/response");
const _url = require('url')
const uuidv4 = require('uuid')
const moment = require('moment')
const path = require("path");

const usersPath = path.join(__dirname, "../users.txt")
const tasksPath = path.join(__dirname, "../tasks.txt")



// userPath
const createUser = async(req, res) => {
    try {
        const body = await getPostBodyAsync(req)
        const { name, email,  role, active } = body; // {...}

        // Validate  here
        if (!name || !email || !role){
            return response(res, {
                status: 400,
                data : { message: "Please make sure name,email and role (active optional) is not empty" }
            })
        }

        const users = await userService.getUsers();

        // check if the user already exists 
        const userExists = users.find((user)=> user.email == body.email)

        if (userExists){
            return response(res, {
                data: { message: `A user with email : ${body.email} already exists`},
                status : 409,
            });
        }

        // will improve later with UUID
        // {}
        body.id = users.length + 1;
        users.push(body);

        await writeDataAsync(usersPath, users);

        return response(res, {message: 'User created Successfully',data: users, status:201})
        
    } catch (error) {
        return response(res, {status:500, data: {message: error.message}})
    }
}

const getUsers = async (req, res) => {
    try {
        // Gotten all users
        const users = await userService.getUsers();
        const query = req.query;

        //const queryKeys = Object.keys(query);

        let filteredUsers = users.filter((user)=>{
            // .very ensures all must denote to true
            return Object.keys(query).every((key)=>{
                const searchTerm = query[key].toLowerCase();
                if (key === 'q'){
                    return(
                        (user.name && user.name.toLowerCase().includes(searchTerm)) ||
                        (user.email && user.email.toLowerCase().includes(searchTerm))
                    );
                }
                else{
                    //meaning the query is actually a key
                    if(query[key] && user[key] !== undefined){
                        return user[key] === query[key];
                    }
                }
                
            })
        })

        return response(res, {data:filteredUsers})
    } catch (error) {
        return response(res, {status:400, data: {message: error.message}})
    }
}

// http://localhost:5000/users/
const getUserById = async (req, res) => {
    if (req.params){
        const id = req.params.id;

        try 
        {
            user = await userService.getUserById(id)
            
            if (user){
                return response(res, {data:user})
            }
            else{
                return response(res, {status:404, data: {message: "USER NOT FOUND"}})
            }
        } 
        catch (error) 
        {
            return response(res, {staus:500, data: {message: error.message}})
        }
        
    } 
    else {
        return response(res,  {status:400, data: {message: "id is required"}})
    }
    
}
// // http://localhost:5000/users/3 {name:"Paraclete"}
const updateUser = async (req, res) => {
    if (req.params){
        const id = req.params.id;
        const body = await getPostBodyAsync(req);
        
        const users = await userService.getUsers()
        const userExists = users.find(user => user.id === parseInt(id))

        if (!userExists){
            return response(res, {
                data: { message: `This user does not exist`},
                status : 409,
            });
        }

        if (body){
            Object.keys(body).forEach( key =>{
                if(body[key] && userExists[key] !== undefined){
                    userExists[key] = body[key]
                }
            })
        }

        await writeDataAsync(usersPath, users);
        return response(res, {staus:200, data: {message: `User with ID ${userExists.id} updated successfully`}})
    }
    else {
        return response(res,  {status:400, data: {message: "id is required"}})
    }



}

// http://localhost:5000/users/3 

const deleteUser = async (req, res) => {
    if (req.params){
        const id = req.params.id;
        
        const users = await userService.getUsers()
        const userExists = users.find(user => user.id === parseInt(id))

        if (!userExists){
            return response(res, {
                data: { message: `This user does not exist`},
                status : 409,
            });
        }
        

        const indexToDelete = users.findIndex(user => userExists);
        console.log(indexToDelete)

        // await writeDataAsync(users);
        // return response(res, {staus:200, data: {message: `User with ID ${userExists.id} updated successfully`}})
        // if (indexToDelete !== -1) {
        //users.splice(indexToDelete, 1); // Remove 1 element at the found index

    }
    else {
        return response(res,  {status:400, data: {message: "id is required"}})
    }

    // I need to check if there is and id
    // I need to check if the id exist, 
    //. I need to update all queries avaliable 
    // I need to push back
    // I need to show the changes
}

// http:localhost:5000/id -> assign a task to the person
// body = {
    // id  - > uuid 
    // title 
    // description,
    // status ie  -> pending

//}
const createTask = async(req, res) => {

    // Check for a userid so we can create our task
    if (req.params){
        const id = req.params.id;
        
        const users = await userService.getUsers()
        const userExists = users.find(user => user.id === parseInt(id))
    
        if (!userExists){
            return response(res, {
                data: { message: `This user does not exist`},
                status : 409,
            });
        }
    
        try {
            const body = await getPostBodyAsync(req)
            const { title, description} = body; // {...}

            // Validate  here
            if (!title|| !description ){
                return response(res, {
                    status: 400,
                    data : { message: "Please make sure title and description is not empty" }
                })
            }

        
            body.id = uuidv4.v4()
            body.status = "pending"
            body.createdAt = moment().format()
            body.user = userExists

            // get all my tasks 
            let tasks = await readDataAsync(tasksPath)
            tasks.push(body);

            await writeDataAsync(tasksPath, tasks);

            return response(res, {message: 'Task created Successfully',data: body, status:201})
            
        } catch (error) {
            return response(res, {status:500, data: {message: error.message}})
        }
    }

    else {
        return response(res,  {status:400, data: {message: "id is required"}})
    }

    


}

module.exports = {createUser, getUsers, getUserById, updateUser, deleteUser, createTask}