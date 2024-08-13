const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
       
    },
    priority: {
        type: String,
        enum: ['Normal', 'Medium', 'High'],
        default: 'Medium',
    },
 
    dueDate: {
        type: Date,
    },
    reminderDate: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'progress', 'completed'],
        default: 'pending',
    },
    active:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
