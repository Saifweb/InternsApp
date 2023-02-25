const express = require('express');
const router = express.Router();
const { login, CreateAccesToken, forgetPassword, resetPassword } = require('../Controllers/authControllers');

router.post('/login', login)
router.post('/token', CreateAccesToken)
router.post('/forgetPassword', forgetPassword)
router.post('/resetPassword', resetPassword)



module.exports = {
    routes: router
}