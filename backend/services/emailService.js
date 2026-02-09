const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
    // Check if email is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('⚠️  Email not configured. Set EMAIL_USER and EMAIL_PASS in .env file');
        return null;
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        return transporter;
    } catch (error) {
        console.error('❌ Error creating email transporter:', error);
        return null;
    }
};

// Send task reminder email
const sendTaskReminderEmail = async (user, tasks) => {
    const transporter = createTransporter();
    
    if (!transporter) {
        console.log('Email service not configured, skipping notification');
        return { success: false, message: 'Email not configured' };
    }

    const tasksList = tasks.map(task => {
        const daysLeft = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
        const urgencyColor = daysLeft <= 2 ? '#ef4444' : daysLeft <= 5 ? '#f59e0b' : '#10b981';
        const urgencyText = daysLeft === 0 ? 'Due Today!' : daysLeft === 1 ? 'Due Tomorrow!' : `${daysLeft} days left`;

        return `
            <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 15px 10px;">
                    <strong style="color: #1e293b; font-size: 16px;">${task.title}</strong>
                    <br/>
                    <span style="color: #64748b; font-size: 14px;">${task.category}</span>
                </td>
                <td style="padding: 15px 10px; text-align: center;">
                    <span style="background: ${urgencyColor}; color: white; padding: 5px 12px; border-radius: 15px; font-size: 13px; font-weight: bold;">
                        ${task.priority.toUpperCase()}
                    </span>
                </td>
                <td style="padding: 15px 10px; text-align: center;">
                    <span style="color: ${urgencyColor}; font-weight: bold; font-size: 14px;">
                        ${urgencyText}
                    </span>
                </td>
            </tr>
        `;
    }).join('');

    const highPriorityCount = tasks.filter(t => t.priority === 'high').length;
    const motivationalQuotes = [
        "Success is the sum of small efforts repeated day in and day out.",
        "The secret of getting ahead is getting started.",
        "Don't watch the clock; do what it does. Keep going.",
        "You've got this! One task at a time.",
        "Small progress is still progress. Keep going!"
    ];
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

    const mailOptions = {
        from: `"Planify Task Manager" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: `📅 ${tasks.length} Task${tasks.length > 1 ? 's' : ''} Need Your Attention!`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
                <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">Planify</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your everyday planning companion</p>
                    </div>

                    <!-- Greeting -->
                    <div style="padding: 30px 20px 20px 20px;">
                        <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 24px;">Hello ${user.name}! 👋</h2>
                        <p style="color: #64748b; margin: 0; font-size: 16px; line-height: 1.6;">
                            You have <strong style="color: #667eea;">${tasks.length} task${tasks.length > 1 ? 's' : ''}</strong> that need your attention.
                            ${highPriorityCount > 0 ? `<br/><strong style="color: #ef4444;">🔴 ${highPriorityCount} of them ${highPriorityCount === 1 ? 'is' : 'are'} high priority!</strong>` : ''}
                        </p>
                    </div>

                    <!-- Tasks Table -->
                    <div style="padding: 0 20px 20px 20px;">
                        <table style="width: 100%; border-collapse: collapse; background: #f8fafc; border-radius: 12px; overflow: hidden;">
                            <thead>
                                <tr style="background: #667eea; color: white;">
                                    <th style="padding: 15px 10px; text-align: left; font-size: 14px; font-weight: 600;">Task</th>
                                    <th style="padding: 15px 10px; text-align: center; font-size: 14px; font-weight: 600;">Priority</th>
                                    <th style="padding: 15px 10px; text-align: center; font-size: 14px; font-weight: 600;">Due</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tasksList}
                            </tbody>
                        </table>
                    </div>

                    <!-- Motivational Quote -->
                    <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); margin: 0 20px 20px 20px; padding: 20px; border-radius: 12px; border-left: 4px solid #667eea;">
                        <p style="margin: 0; color: #1e293b; font-style: italic; font-size: 15px; line-height: 1.6;">
                            "${randomQuote}"
                        </p>
                    </div>

                    <!-- Call to Action -->
                    <div style="padding: 0 20px 30px 20px; text-align: center;">
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard" 
                           style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 40px; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);">
                            View My Tasks
                        </a>
                    </div>

                    <!-- Footer -->
                    <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0; color: #64748b; font-size: 13px;">
                            You're receiving this because you enabled email notifications in Planify.
                        </p>
                        <p style="margin: 5px 0 0 0; color: #64748b; font-size: 13px;">
                            © ${new Date().getFullYear()} Planify. All rights reserved.
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully to ${user.email}`);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('❌ Email send error:', error.message);
        return { success: false, message: error.message };
    }
};

// Send welcome email
const sendWelcomeEmail = async (user) => {
    const transporter = createTransporter();
    
    if (!transporter) {
        return { success: false, message: 'Email not configured' };
    }

    const mailOptions = {
        from: `"Planify Task Manager" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: '🎉 Welcome to Planify - Let\'s Get Organized!',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
                <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 36px;">Welcome to Planify! 🎉</h1>
                    </div>
                    <div style="padding: 40px 30px;">
                        <h2 style="color: #1e293b; margin: 0 0 20px 0;">Hello ${user.name},</h2>
                        <p style="color: #64748b; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
                            We're thrilled to have you on board! Planify is here to help you stay organized, 
                            manage your tasks efficiently, and achieve your goals.
                        </p>
                        <h3 style="color: #667eea; margin-top: 30px;">Here's what you can do:</h3>
                        <ul style="color: #64748b; font-size: 15px; line-height: 2;">
                            <li>📝 Create and organize your tasks</li>
                            <li>🎯 Set priorities and due dates</li>
                            <li>📊 Track your progress with statistics</li>
                            <li>📧 Get email reminders for upcoming tasks</li>
                        </ul>
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard" 
                               style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 40px; border-radius: 25px; font-weight: bold; font-size: 16px;">
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Welcome email sent to ${user.email}`);
        return { success: true };
    } catch (error) {
        console.error('❌ Welcome email error:', error.message);
        return { success: false, message: error.message };
    }
};

module.exports = {
    sendTaskReminderEmail,
    sendWelcomeEmail
};