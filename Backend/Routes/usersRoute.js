const express = require('express');
const router = express.Router();
const { createUser, getAllUsers,getInterns,getTaskNumbers, getUserById, updateUser, deleteUser, ConnectedUser, superUpdateUser, assignAsupervioserToIntern, updatePassword } = require('../Controllers/usersControllers');
const { authenticateToken } = require('../middlewares/auth');

//Example of route
// router.<Methode>("url",function)
//Methode can be put(update),post(Create),get(Index),delete(Delete)
//router.put('/reservation', StateDone);

//create,getallusers,patch,delete is tested
router.post('/user', authenticateToken, createUser),
    router.get('/users', authenticateToken, getAllUsers),
    router.get('/supervisorInterns', authenticateToken, getInterns),
    router.get('/NumberOfTasks', authenticateToken, getTaskNumbers),

    //router.get('/users/:id', authenticateToken, getUserById),
    router.patch('/user', authenticateToken, updateUser),
    router.patch('/super/user/:user_id', authenticateToken, superUpdateUser),
    router.patch('/super/user/:user_id/:supervisor_id', authenticateToken, assignAsupervioserToIntern),
    router.patch('/user/password', authenticateToken, updatePassword),
    router.delete('/user/:user_id', authenticateToken, deleteUser),
    router.get('/me', authenticateToken, ConnectedUser),



    module.exports = {
        routes: router
    }
