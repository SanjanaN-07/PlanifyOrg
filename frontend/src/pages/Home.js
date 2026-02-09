import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState(0);

  // Student motivational quotes
  const quotes = [
    "The expert in anything was once a beginner. - Helen Hayes",
    "Education is the passport to the future. - Malcolm X",
    "Success is the sum of small efforts repeated day in and day out. - Robert Collier",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn't just find you. You have to go out and get it.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Dream bigger. Do bigger.",
    "Don't stop when you're tired. Stop when you're done.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Study hard, and you might land a good job. Study smart, and you'll build a successful career.",
  ];

  // Rotate quotes every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="home-navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <img src="/logo1.jpeg" alt="Planify Logo" className="navbar-logo" />
            <span className="navbar-title">Planify</span>
          </div>
          <div className="navbar-menu">
            <Link to="/" className="navbar-link active">Home</Link>
            <Link to="/about" className="navbar-link">About</Link>
            <Link to="/quotes" className="navbar-link">Quotes</Link>
            <Link to="/gk" className="navbar-link">G.K</Link>
            {isAuthenticated ? (
              <Link to="/dashboard" className="navbar-button">Dashboard</Link>
            ) : (
              <Link to="/login" className="navbar-button">Login / Register</Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src="/logo1.jpeg"
            alt="Planify"
            className="hero-logo"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
          />
          <h1 className="hero-title">Welcome to Planify</h1>
          <p className="hero-subtitle">Your everyday planning companion</p>

          {/* Rotating Quotes */}
          <div className="quote-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                className="quote-box"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <span className="quote-icon">"</span>
                <p className="quote-text">{quotes[currentQuote]}</p>
                <span className="quote-icon-end">"</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            className="cta-button"
            onClick={handleGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
          </motion.button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Why Choose Planify?
        </motion.h2>

        <div className="features-grid">
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="feature-icon">📝</div>
            <h3>Smart Task Management</h3>
            <p>Organize your homework, projects, and exams with easy-to-use task lists and categories.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="feature-icon">🎯</div>
            <h3>Priority Management</h3>
            <p>Set priorities for your tasks and never miss important deadlines again.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="feature-icon">📊</div>
            <h3>Track Your Progress</h3>
            <p>Visualize your productivity with beautiful statistics and completion rates.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="feature-icon">📅</div>
            <h3>Due Date Reminders</h3>
            <p>Stay on top of deadlines with smart due date tracking for all your tasks.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="feature-icon">🎨</div>
            <h3>Beautiful Interface</h3>
            <p>Enjoy a clean, modern design that makes planning your day a pleasure.</p>
          </motion.div>

          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your tasks are encrypted and stored securely. Only you can access them.</p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          How Planify Works
        </motion.h2>

        <div className="steps-container">
          <motion.div
            className="step"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Create Your Account</h3>
              <p>Sign up in seconds with just your name, email, and password. It's completely free!</p>
            </div>
          </motion.div>

          <motion.div
            className="step"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Add Your Tasks</h3>
              <p>Create tasks with titles, descriptions, categories, priorities, and due dates.</p>
            </div>
          </motion.div>

          <motion.div
            className="step"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Track & Complete</h3>
              <p>Mark tasks as complete, view your progress, and stay motivated with statistics.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Get Organized?</h2>
          <p>Join thousands of students who are already using Planify to ace their studies!</p>
          <motion.button
            className="cta-button-large"
            onClick={handleGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Start Planning Today'}
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <img src="/logo1.jpeg" alt="Planify" className="footer-logo" />
            <h3>Planify</h3>
            <p>Your everyday planning companion</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/quotes">Quotes</Link>
            <Link to="/gk">G.K</Link>
          </div>
          <div className="footer-section">
            <h4>Account</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@planify.com</p>
            <p>© 2026 Planify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
