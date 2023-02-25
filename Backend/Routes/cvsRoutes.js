const express = require('express');
const router = express.Router();
const resumesController = require('../Controllers/cvsControllers');
const { authenticateToken } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');



router.post('/resume', upload.single("resume"), resumesController.create);
// u can be an admin or a user 
router.put('/resume/:resume_id', authenticateToken, resumesController.update);
// u need to be admin
router.get('/resumes', authenticateToken, resumesController.readAll);
router.get('/resume/:resume_id', authenticateToken, resumesController.readOne);
router.delete('/resume/:resume_id', authenticateToken, resumesController.Delete);

module.exports = {
    routes: router
}