const express = require('express');
const router = express.Router();
const { Create, Index, Update, Delete } = require('../Controllers/cvsControllers');

//Example of route
// router.<Methode>("url",function)
//Methode can be put(update),post(Create),get(Index),delete(Delete)
//router.put('/reservation', StateDone);

module.exports = {
    routes: router
}