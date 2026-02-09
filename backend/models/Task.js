const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    category: {
        type: String,
        enum: ['homework', 'project', 'exam', 'reading', 'other'],
        default: 'other'
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'medium'
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required']
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date
    },
    tags: [{
        type: String,
        trim: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Update completedAt when task is marked as complete
taskSchema.pre('save', function(next) {
    if (this.isModified('completed') && this.completed) {
        this.completedAt = new Date();
    } else if (this.isModified('completed') && !this.completed) {
        this.completedAt = null;
    }
    next();
});

// Index for faster queries
taskSchema.index({ userId: 1, dueDate: 1 });
taskSchema.index({ userId: 1, completed: 1 });
taskSchema.index({ userId: 1, priority: 1 });

module.exports = mongoose.model('Task', taskSchema);
