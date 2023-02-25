const express = require('express');
const router = express.Router();
const { Create, getMeetings, updateMeeting, DeleteMeeting } = require('../Controllers/meetingControllers');
const { authenticateToken } = require('../middlewares/auth');

//Example of route
// router.<Methode>("url",function)
//Methode can be put(update),post(Create),get(Index),delete(Delete)
//router.put('/reservation', StateDone);

router.get('/meetings', authenticateToken, getMeetings),
    router.post('/meeting', authenticateToken, Create),
    router.patch('/meeting/:meeting_id', authenticateToken, updateMeeting),
    router.delete('/meeting/:meeting_id', authenticateToken, DeleteMeeting),

    module.exports = {
        routes: router
    }