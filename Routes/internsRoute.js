const express = require('express');
const router = express.Router();
const { Create, Index, Update, Delete } = require('../Controllers/tasksControllers');

//Example of route
// router.<Methode>("url",function)
//Methode can be put(update),post(Create),get(Index),delete(Delete)
//router.put('/reservation', StateDone);
 
router.get('/task',Index),
router.post('/task',Create),
router.patch('/task/:id',Update),
router.get('/task/:id',Delete),

module.exports = {
    routes: router
}