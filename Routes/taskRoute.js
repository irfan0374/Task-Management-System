const express = require('express');
const taskRoute = express.Router();
const auth=require('../middleware/auth')
const { 
  createTask, 
  getTaskById, 
  updateTask, 
  deleteTask, 
  statusChange, 
  setTaskReminder ,
  StatusBased
} = require('../Controller/taskController');


taskRoute.post('/create',auth, createTask);
taskRoute.get('/getTask/:id',auth, getTaskById);
taskRoute.put('/updateTask/:id',auth, updateTask);
taskRoute.delete('/delete/:id',auth, deleteTask);
taskRoute.patch('/statusChange/:id',auth, statusChange);
taskRoute.get('/basedOnStatus',auth, StatusBased);
taskRoute.patch('/progress/:id',auth, setTaskReminder);


module.exports = taskRoute;
