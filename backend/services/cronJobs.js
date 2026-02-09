const cron = require('node-cron');
const User = require('../models/User');
const Task = require('../models/Task');
const { sendTaskReminderEmail } = require('../services/emailService');

// Function to check and send task reminders
const checkAndSendReminders = async () => {
    try {
        console.log('🔔 Running daily task reminder check...');

        // Get all users who have email notifications enabled
        const users = await User.find({ emailNotifications: true });

        for (const user of users) {
            // Get tasks that are due today or tomorrow or overdue
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const threeDaysFromNow = new Date(today);
            threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

            const urgentTasks = await Task.find({
                userId: user._id,
                completed: false,
                dueDate: { $lte: threeDaysFromNow }
            }).sort({ dueDate: 1, priority: -1 });

            // Only send email if there are urgent tasks
            if (urgentTasks.length > 0) {
                console.log(`📧 Sending reminder to ${user.email} for ${urgentTasks.length} tasks`);
                await sendTaskReminderEmail(user, urgentTasks);
            }
        }

        console.log('✅ Daily reminder check completed');
    } catch (error) {
        console.error('❌ Error in daily reminder check:', error);
    }
};

// Schedule task to run every day at 8:00 AM
const startDailyNotifications = () => {
    // Run at 8:00 AM every day
    // Format: minute hour day month dayOfWeek
    cron.schedule('0 8 * * *', () => {
        checkAndSendReminders();
    });

    console.log('📅 Daily notifications scheduled for 8:00 AM every day');
    
    // Optionally, run immediately on server start for testing
    if (process.env.NODE_ENV === 'development') {
        console.log('🧪 Running initial check (development mode)...');
        // Uncomment the line below to test immediately
         checkAndSendReminders();
    }
};

module.exports = { startDailyNotifications, checkAndSendReminders };
