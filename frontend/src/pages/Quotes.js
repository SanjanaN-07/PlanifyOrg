import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './InfoPages.css';

const Quotes = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const quotes = [
    { text: "The expert in anything was once a beginner.", author: "Helen Hayes", category: "motivation" },
    { text: "Education is the passport to the future.", author: "Malcolm X", category: "education" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier", category: "success" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "motivation" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "confidence" },
    { text: "Your limitation—it's only your imagination.", author: "Unknown", category: "motivation" },
    { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown", category: "motivation" },
    { text: "Great things never come from comfort zones.", author: "Unknown", category: "motivation" },
    { text: "Dream it. Wish it. Do it.", author: "Unknown", category: "success" },
    { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown", category: "success" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown", category: "success" },
    { text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown", category: "motivation" },
    { text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown", category: "motivation" },
    { text: "Study hard, and you might land a good job. Study smart, and you'll build a successful career.", author: "Unknown", category: "education" },
    { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King", category: "education" },
    { text: "Education is not preparation for life; education is life itself.", author: "John Dewey", category: "education" },
    { text: "The roots of education are bitter, but the fruit is sweet.", author: "Aristotle", category: "education" },
    { text: "Don't let what you cannot do interfere with what you can do.", author: "John Wooden", category: "motivation" },
    { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar", category: "motivation" },
    { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson", category: "success" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "confidence" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "motivation" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair", category: "confidence" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "success" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "motivation" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "motivation" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain", category: "motivation" },
    { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi", category: "confidence" },
    { text: "Failure is the opportunity to begin again more intelligently.", author: "Henry Ford", category: "motivation" },
    { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson", category: "confidence" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis", category: "motivation" },
    { text: "The mind is everything. What you think you become.", author: "Buddha", category: "confidence" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "motivation" },
    { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin", category: "education" },
    { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein", category: "success" },
    { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison", category: "motivation" },
    { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein", category: "confidence" },
    { text: "The person who says it cannot be done should not interrupt the person who is doing it.", author: "Chinese Proverb", category: "motivation" },
    { text: "There are no shortcuts to any place worth going.", author: "Beverly Sills", category: "success" },
    { text: "Opportunities don't happen. You create them.", author: "Chris Grosser", category: "success" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller", category: "motivation" },
    { text: "I find that when you have a real interest in life and a curious life, that sleep is not the most important thing.", author: "Martha Stewart", category: "motivation" },
    { text: "It's hard to beat a person who never gives up.", author: "Babe Ruth", category: "motivation" },
    { text: "I wake up every morning and think to myself, 'how far can I push this company in the next 24 hours.'", author: "Leah Busque", category: "motivation" },
    { text: "If people are doubting how far you can go, go so far that you can't hear them anymore.", author: "Michele Ruiz", category: "confidence" },
    { text: "We need to accept that we won't always make the right decisions.", author: "Unknown", category: "confidence" },
    { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun", category: "motivation" },
    { text: "Never let success get to your head and never let failure get to your heart.", author: "Unknown", category: "success" },
    { text: "Work hard in silence, let your success be the noise.", author: "Frank Ocean", category: "success" },
    { text: "Don't limit your challenges. Challenge your limits.", author: "Unknown", category: "motivation" },
  ];

  const categories = [
    { id: 'all', name: 'All Quotes', icon: '📚' },
    { id: 'motivation', name: 'Motivation', icon: '💪' },
    { id: 'success', name: 'Success', icon: '🏆' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'confidence', name: 'Confidence', icon: '⭐' },
  ];

  const filteredQuotes = selectedCategory === 'all' 
    ? quotes 
    : quotes.filter(q => q.category === selectedCategory);

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
            <Link to="/about" className="navbar-link">About</Link>
            <Link to="/quotes" className="navbar-link active">Quotes</Link>
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
          <h1>Inspirational Quotes</h1>
          <p className="subtitle">Get motivated and stay focused on your goals</p>
        </motion.div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Quotes Grid */}
        <div className="quotes-grid">
          {filteredQuotes.map((quote, index) => (
            <motion.div
              key={index}
              className="quote-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="quote-mark">"</div>
              <p className="quote-text-card">{quote.text}</p>
              <p className="quote-author">— {quote.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quotes;
