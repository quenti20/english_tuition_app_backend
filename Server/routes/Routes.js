const express = require('express');
const router = express.Router();
const userController = require('../controllers/User')
const teacherController = require('../controllers/Teachers')


router.post('/newUser',userController.createNewUser)
router.post('/login',userController.userLogin)
router.put('/updateUser/:id',userController.updateUser)
router.get('/getAllUsers/',userController.getAllUsers)
router.put('/deleteUser/:id',userController.deleteUser)
router.put('/changePassword/:id',userController.changePassword)

router.post('/createTeacher', teacherController.createTeacher ) 
router.get('/getAllTeachers', teacherController.getAllTeachers ) 
router.put('/updateTeacher/:id',teacherController.updateTeacher)
router.delete('/deleteTeacher/:id',teacherController.deleteTeacher)

module.exports = router ;