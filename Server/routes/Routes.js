const express = require('express');
const router = express.Router();
const userController = require('../controllers/User')

router.post('/newUser',userController.createNewUser)
router.post('/login',userController.userLogin)
router.put('/updateUser/:id',userController.updateUser)
router.get('/getAllUsers/',userController.getAllUsers)



module.exports = router ;