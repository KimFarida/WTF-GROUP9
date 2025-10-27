const { getPostBodyAsync } = require("../utils/getPostBodyAsync")
const response = require("../utils/response");
const userService = require("../services/userServices");
const _url = require('url')
const uuid = require('uuid')
const moment = require('moment')


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

        body.id = uuid.v4();
        users.push(body);

        await userService.writeUser(users);

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
                status : 404,
            });
        }

        if (body){
            Object.keys(body).forEach( key =>{
                if(body[key] && userExists[key] !== undefined){
                    userExists[key] = body[key]
                }
            })
        }

        await userService.writeUser(users);
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
                status : 404,
            });
        }
        

        const indexToDelete = users.findIndex(user => userExists);
        if (indexToDelete !== -1) {
            users.splice(indexToDelete, 1)
            await userService.writeUser(users)
            return response(res, {staus:204})
        }
        
        return response(res, {staus:404, data: {message: `User with ID ${userExists.id} does not exist`}})

    }
    else {
        return response(res,  {status:400, data: {message: "id is required"}})
    }

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
                status : 404,
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

        
            body.id = uuid.v4()
            body.status = "pending"
            body.createdAt = moment().format()
            body.user = userExists

            // get all my tasks 
            let tasks = await userService.getTasks();
            tasks.push(body);
            await userService.writeTask(tasks);

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