const express = require('express')
const tasksControeller = require ('./controllers/taksController')
const tasksMiddleware = require('../src/middlewares/tasksMiddleware')

const router = express.Router();

router.get('/tasks', tasksControeller.getAll)
router.get('/tasks/:id',tasksControeller.getID)
router.post('/tasks',tasksMiddleware.validateTITLE, tasksControeller.createTask)
router.delete('/tasks/:id',tasksControeller.deleteTasks)
router.put('/tasks/:id',tasksMiddleware.validateTITLE,tasksMiddleware.validateSTATUS,tasksControeller.updateTasks)



module.exports = router