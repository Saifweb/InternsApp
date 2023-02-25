const express = require('express');
const router = express.Router();
const { Create, Index, Update, Delete } = require('../Controllers/tasksControllers');
const { authenticateToken } = require('../middlewares/auth');

//Example of route
// router.<Methode>("url",function)
//Methode can be put(update),post(Create),get(Index),delete(Delete)
//router.put('/reservation', StateDone);

router.get('/tasks', authenticateToken, Index),
    router.post('/task', authenticateToken, Create),
    router.patch('/task/:id', authenticateToken, Update),
    router.delete('/task/:id', authenticateToken, Delete),

    module.exports = {
        routes: router
    }