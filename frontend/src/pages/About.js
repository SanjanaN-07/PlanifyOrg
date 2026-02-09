import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './InfoPages.css';

const About = () => {
  return (
    <div className="info-page">
      <nav className="home-navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <img src="/logo1.jpeg" alt="Planify Logo" className="navbar-logo" />
            <span className="navbar-title">Planify</span>
          </div>
          <div className="navbar-menu">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/about" className="navbar-link active">About</Link>
            <Link to="/quotes" className="navbar-link">Quotes</Link>
            <Link to="/gk" className="navbar-link">G.K</Link>
            <Link to="/login" className="navbar-button">Login / Register</Link>
          </div>
        </div>
      </nav>

      <div className="info-content">
        <motion.div
          className="info-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>About Planify</h1>
          <p className="subtitle">Your everyday planning companion</p>
        </motion.div>

        <motion.div
          className="content-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>What is Planify?</h2>
          <p>
            Planify is a modern, intuitive task management application designed specifically for students.
            We understand the challenges of balancing homework, projects, exams, and personal life, and
            we've created a tool that makes organization effortless and even enjoyable.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to help students achieve their academic goals by providing them with a simple
            yet powerful platform to organize their tasks, track their progress, and stay motivated. We
            believe that with the right tools, every student can reach their full potential.
          </p>

          <h2>Why We Built Planify</h2>
          <p>
            As students ourselves, we experienced firsthand the stress of managing multiple deadlines,
            assignments, and exams. Traditional planners were too rigid, and existing apps were either
            too complex or lacked essential features. So we decided to build Planify – a task manager
            that's specifically designed for the way students work and think.
          </p>

          <h2>Key Features</h2>
          <ul>
            <li>📝 <strong>Smart Task Management:</strong> Organize tasks by category, priority, and due date</li>
            <li>📊 <strong>Progress Tracking:</strong> Visualize your productivity with beautiful statistics</li>
            <li>🎯 <strong>Priority System:</strong> Focus on what matters most with color-coded priorities</li>
            <li>📅 <strong>Due Date Reminders:</strong> Never miss an important deadline again</li>
            <li>🎨 <strong>Beautiful Interface:</strong> Enjoy a clean, modern design that makes planning fun</li>
            <li>🔒 <strong>Secure & Private:</strong> Your data is encrypted and completely private</li>
            <li>📱 <strong>Fully Responsive:</strong> Access your tasks on any device, anywhere</li>
          </ul>

          <h2>Our Values</h2>
          <p>
            <strong>Simplicity:</strong> We believe powerful doesn't have to mean complicated. Planify is
            designed to be intuitive and easy to use from day one.
          </p>
          <p>
            <strong>Student-Centric:</strong> Every feature is designed with students in mind, from the
            categories we offer to the way we visualize progress.
          </p>
          <p>
            <strong>Privacy:</strong> Your tasks and personal information are yours alone. We never share
            or sell your data.
          </p>

          <h2>Get Started Today</h2>
          <p>
            Join thousands of students who are already using Planify to stay organized and achieve their
            academic goals. Create your free account today and experience the difference!
          </p>

          <Link to="/register" className="cta-button-info">
            Start Using Planify
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
