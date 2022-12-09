const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const TaskController = require('../controllers/TaskController')

//routes
router.get('/', UserController.first)
router.get('/login', UserController.login)
router.post('/login', UserController.loginPost)
router.post('/register', UserController.authRegister)
router.get('/register', UserController.register)
router.get('/logout', UserController.logout)
router.get('/createTask', TaskController.createTask)
router.post('/createTaskPost', TaskController.createTaskPost)
router.get('/myTask', TaskController.myTask)
router.post('/exclude', TaskController.excludeTask)
router.get('/initial', UserController.inicio)

module.exports = router