const express = require('express');
const router = express.Router();
const userController = require('../controllers/User')
const teacherController = require('../controllers/Teachers')
const alumniController = require('../controllers/Alumni')
const testController = require('../controllers/Test')
const publicationController = require('../controllers/Publication')
const dataController = require('../controllers/Data')
const notesController = require('../controllers/Notes')
const bannerController = require('../controllers/Banner')
const feeController = require('../controllers/Fee')
const gallery_imagesController = require('../controllers/GalleryImages')
const scheduleController = require('../controllers/Schedule')

router.post('/newUser',userController.createNewUser)
router.post('/login',userController.userLogin)
router.put('/updateUser/:id',userController.updateUser)
router.get('/getAllUsers/',userController.getAllUsers)
router.delete('/deleteUser/:id',userController.deleteUser)
router.put('/changePassword/:id',userController.changePassword)

router.post('/createTeacher', teacherController.createTeacher ) 
router.get('/getAllTeachers', teacherController.getAllTeachers ) 
router.put('/updateTeacher/:id',teacherController.updateTeacher)
router.delete('/deleteTeacher/:id',teacherController.deleteTeacher)

router.post('/createAlumni',alumniController.createAlumni)
router.get('/getAllAlumni',alumniController.getAllAlumni)
router.put('/updateAlumni/:id',alumniController.updateAlumni)
router.delete('/deleteAlumni/:id',alumniController.deleteAlumni)

router.post('/createTest',testController.createTest)
router.get('/getAllTests',testController.getAllTests)
router.put('/updateTest/:id',testController.updateTest)
router.delete('/deleteTest/:id',testController.deleteTest)

router.post('/createPublication',publicationController.createPublication)
router.get('/getAllPublications',publicationController.getPublicationDetails)
router.put('/updatePublication/:id',publicationController.updatePublication)
router.delete('/deletePublication/:id',publicationController.deletePublication)

router.post('/createData',dataController.createData)
router.get('/getAllData',dataController.getAllData)
router.put('/updateData/:id',dataController.updateData)
router.delete('/deleteData/:id',dataController.deleteData)

router.post('/createNotes',notesController.createNotes)
router.get('/getAllNotes',notesController.getAllNotes)
router.put('/updateNotes/:id',notesController.updateNote)
router.delete('/deleteNote/:id',notesController.deleteNote)


router.post('/createBanner',bannerController.createBanner)
router.get('/getAllBanners',bannerController.getAllBanners)
router.put('/updateBanner/:id',bannerController.updateBanner)
router.delete('/deleteBanner/:id',bannerController.deleteBanner)

router.post('/createFee',feeController.createFee)
router.get('/getAllFee',feeController.getAllFees)
router.put('/updateFee/:id',feeController.updateFee)
router.delete('/deleteFee/:id',feeController.deleteFee) 

router.post('/createGalleryImage',gallery_imagesController.createGalleryImage)
router.get('/getAllGalleryImages',gallery_imagesController.getAllGalleryImages)
router.put('/updateGalleryImage/:id',gallery_imagesController.updateGalleryImage)
router.delete('/deleteGalleryImage/:id',gallery_imagesController.deleteGalleryImage) 

router.post('/createSchedule',scheduleController.createSchedule)
router.get('/getAllSchedules',scheduleController.getAllSchedules)
router.put('/updateSchedule/:id',scheduleController.updateSchedule)
router.delete('/deleteSchedule/:id',scheduleController.deleteSchedule) 

module.exports = router ;