const userController = require('../controllers/userController')
const response = require('../utils/response')

const routes = {
    "/": {
        GET: (_req, res) => {
            response(res, { data: { message: "NODEJS REST API"}});
        },          
    },
    "/users": {
        GET: userController.getUsers,
        POST: userController.createUser
        
    },
    "/users/:id": {
        GET: userController.getUserById,
        PUT: userController.updateUser,
        DELETE: userController.deleteUser,
    },
    "/tasks/:id":{
        POST: userController.createTask,
    }
};

//http://localhost:5000/products/3 
module.exports = { routes };