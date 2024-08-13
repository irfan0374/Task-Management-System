require('dotenv').config()
const Task = require('../Model/Task_Model')
const User=require('../Model/User_Model')
const mongoose=require('mongoose')

module.exports = {

    createTask: async (req, res) => {
        try {
            console.log(req.body)
            const { taskTitle, description, PriorityLevel, dueDate, reminderDate, _id } = req.body;
            const task = new Task({
                title:taskTitle,
                 description:description,
                  priority:PriorityLevel,
                    dueDate:dueDate,
                     reminderDate:reminderDate,
                      user:_id
            })
            await task.save()
         
            res.status(201).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, message: "failed to create task", error })
            console.log(error.message)
        }

    },

    getTask: async (req, res) => {
        try {
            const { priority, status, sortby, userId } = req.query;
            const filters = { user: userId }
            if (priority) filters.priority = priority
            if (status) filters.status = status
            const task = await Task.find(filters).sort(sortby)
            res.status(200).json({ success: true, task })

        } catch (error) {
            res.status(500).json({ success: false, message: "failed to fetch task", error })
            console.log(error.message)
        }
    },

     getTaskById : async (req, res) => {
        try {
            const { id } = req.params;
    
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ success: false, message: "Invalid User ID" });
            }
    
            const tasks = await Task.find({ user: id }).populate('user'); 
            if (tasks.length === 0) {
                return res.status(404).json({ success: false, message: "No tasks found this user" });
            }
    
            res.status(200).json({ success: true, tasks });
        } catch (error) {
            console.error('Failed to fetch tasks:', error.message);
            res.status(500).json({ success: false, message: "Failed to fetch tasks", error: error.message });
        }
    },
    
    updateTask: async (req, res) => {
        try {
            const { id } = req.params
            const update = req.body
            const task = Task.findOneAndUpdate(id, update, { new: true })
            if (!task) {
                return res.status(404).json({ success: true, message: "task not found" })
            }
            res.status(200).json({ success: true, task })
        } catch (error) {
            res.status(500).json({ success: false, message: "failed to update the task", error })
        }
    },
    deleteTask: async (req, res) => {
        try {
            const { id } = req.params;
            const task = await Task.findByIdAndDelete(id);
            if (!task) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }
            res.status(200).json({ success: true, message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to delete task', error });
        }
    },
    statusChange: async (req, res) => {
        try {
            const { id,status } = req.query;
            const task = await Task.findByIdAndUpdate(id, { status: status}, { new: true });
            if (!task) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }
            res.status(200).json({ success: true, task });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to mark completed', error });
        }
    },
    setTaskReminder:async(req,res)=>{
        try {
            const { id } = req.params;
            const { reminderDate } = req.body;
            const task = await Task.findByIdAndUpdate(id, { reminderDate }, { new: true });
            if (!task) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }
            res.status(200).json({ success: true, task });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to set reminder for task', error });
        }
    },
    StatusBased : async (req, res) => {
        try {
            const { id, status } = req.query; 

        if (!id || !status) {
            return res.status(400).json({ success: false, message: 'ID and status are required' });
        }
        const tasks = await Task.find({ user: id, status: status }).populate("user");
        console.log(tasks,"status")

        if (!tasks.length) {
            return res.status(200).json({ success: false, message: 'No tasks found' });
        }

            res.status(200).json({ success: true, tasks });
        } catch (error) {
            console.error('Failed to fetch tasks:', error.message);
            res.status(500).json({ success: false, message: "Failed to fetch tasks", error: error.message });
        }
    },

}