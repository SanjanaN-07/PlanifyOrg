const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { protect } = require('../middleware/auth');

// All routes are protected (need authentication)
router.use(protect);

// @route   GET /api/tasks
// @desc    Get all tasks for logged-in user
// @access  Private
router.get('/', async (req, res) => {
    try {
        const { completed, priority, category } = req.query;
        
        // Build query
        let query = { userId: req.user._id };
        
        if (completed !== undefined) {
            query.completed = completed === 'true';
        }
        
        if (priority) {
            query.priority = priority;
        }
        
        if (category) {
            query.category = category;
        }

        const tasks = await Task.find(query).sort({ dueDate: 1, createdAt: -1 });
        
        res.json({
            success: true,
            count: tasks.length,
            tasks
        });
    } catch (error) {
        res.status(400).json({ 
            error: 'Failed to fetch tasks',
            message: error.message 
        });
    }
});

// @route   GET /api/tasks/stats
// @desc    Get task statistics
// @access  Private
router.get('/stats', async (req, res) => {
    try {
        const userId = req.user._id;

        const totalTasks = await Task.countDocuments({ userId });
        const completedTasks = await Task.countDocuments({ userId, completed: true });
        const pendingTasks = await Task.countDocuments({ userId, completed: false });
        const highPriorityTasks = await Task.countDocuments({ userId, priority: 'high', completed: false });
        
        // Tasks due today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const tasksDueToday = await Task.countDocuments({
            userId,
            completed: false,
            dueDate: { $gte: today, $lt: tomorrow }
        });

        res.json({
            success: true,
            stats: {
                totalTasks,
                completedTasks,
                pendingTasks,
                highPriorityTasks,
                tasksDueToday,
                completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
            }
        });
    } catch (error) {
        res.status(400).json({ 
            error: 'Failed to fetch statistics',
            message: error.message 
        });
    }
});

// @route   GET /api/tasks/:id
// @desc    Get single task
// @access  Private
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ 
            _id: req.params.id, 
            userId: req.user._id 
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ success: true, task });
    } catch (error) {
        res.status(400).json({ 
            error: 'Failed to fetch task',
            message: error.message 
        });
    }
});

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', async (req, res) => {
    try {
        const task = await Task.create({
            ...req.body,
            userId: req.user._id
        });

        res.status(201).json({ 
            success: true, 
            message: 'Task created successfully',
            task 
        });
    } catch (error) {
        res.status(400).json({ 
            error: 'Failed to create task',
            message: error.message 
        });
    }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', async (req, res) => {
    try {
        let task = await Task.findOne({ 
            _id: req.params.id, 
            userId: req.user._id 
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({ 
            success: true, 
            message: 'Task updated successfully',
            task 
        });
    } catch (error) {
        res.status(400).json({ 
            error: 'Failed to update task',
            message: error.message 
        });
    }
});

// @route   PATCH /api/tasks/:id/toggle
// @desc    Toggle task completion status
// @access  Private
router.patch('/:id/toggle', async (req, res) => {
    try {
        const task = await Task.findOne({ 
            _id: req.params.id, 
            userId: req.user._id 
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.completed = !task.completed;
        await task.save();

        res.json({ 
            success: true, 
            message: `Task marked as ${task.completed ? 'completed' : 'active'}`,
            task 
        });
    } catch (error) {
        res.status(400).json({ 
            error: 'Failed to toggle task',
            message: error.message 
        });
    }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ 
            _id: req.params.id, 
            userId: req.user._id 
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.json({ 
            success: true, 
            message: 'Task deleted successfully' 
        });
    } catch (error) {
        res.status(400).json({ 
            error: 'Failed to delete task',
            message: error.message 
        });
    }
});

module.exports = router;
