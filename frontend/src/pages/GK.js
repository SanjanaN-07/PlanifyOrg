import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './InfoPages.css';

const GK = () => {
  const [selectedSubject, setSelectedSubject] = useState('study-tips');
  const navigate = useNavigate();

  // Map topic titles to URL slugs
  const getTopicSlug = (title) => {
    return title.toLowerCase()
      .replace(/[&]/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleCardClick = (title) => {
    const slug = getTopicSlug(title);
    navigate(`/gk/${slug}`);
  };

  const content = {
    'study-tips': {
      title: 'Study Tips & Techniques',
      icon: '📖',
      items: [
        { title: 'Pomodoro Technique', desc: 'Study for 25 minutes, then take a 5-minute break. After 4 sessions, take a longer 15-30 minute break.' },
        { title: 'Active Recall', desc: 'Test yourself regularly instead of just re-reading notes. This strengthens memory retention.' },
        { title: 'Spaced Repetition', desc: 'Review material at increasing intervals over time to move information into long-term memory.' },
        { title: 'Feynman Technique', desc: 'Explain concepts in simple terms as if teaching someone else. Identify gaps in your understanding.' },
        { title: 'Mind Mapping', desc: 'Create visual diagrams connecting ideas and concepts. Great for visual learners.' },
        { title: 'Study Groups', desc: 'Collaborate with peers to share knowledge and different perspectives on topics.' },
        { title: 'Cornell Note-Taking', desc: 'Divide your notes into cues, notes, and summary sections for better organization and review.' },
        { title: 'SQ3R Method', desc: 'Survey, Question, Read, Recite, Review - a systematic approach to reading textbooks effectively.' },
      ]
    },
    'productivity': {
      title: 'Productivity Hacks',
      icon: '⚡',
      items: [
        { title: 'Eat the Frog', desc: 'Do your most difficult task first thing in the morning when your energy is highest.' },
        { title: 'Two-Minute Rule', desc: 'If a task takes less than 2 minutes, do it immediately instead of adding it to your list.' },
        { title: 'Time Blocking', desc: 'Dedicate specific time blocks for different activities throughout your day.' },
        { title: 'Digital Detox', desc: 'Set specific times to check emails and social media. Turn off non-essential notifications.' },
        { title: 'Morning Routine', desc: 'Start your day with a consistent routine: exercise, meditation, healthy breakfast, and planning.' },
        { title: 'Weekly Review', desc: 'Spend 30 minutes each week reviewing accomplishments and planning for the week ahead.' },
        { title: 'Batch Processing', desc: 'Group similar tasks together and do them in one sitting to minimize context switching.' },
        { title: '80/20 Rule', desc: 'Focus on the 20% of tasks that will give you 80% of results. Prioritize high-impact activities.' },
      ]
    },
    'exam-prep': {
      title: 'Exam Preparation',
      icon: '✍️',
      items: [
        { title: 'Start Early', desc: 'Begin studying at least 2-3 weeks before exams. Cramming reduces retention and increases stress.' },
        { title: 'Practice Tests', desc: 'Take practice exams under timed conditions to simulate the real testing environment.' },
        { title: 'Understand, Don\'t Memorize', desc: 'Focus on understanding concepts rather than rote memorization for better retention.' },
        { title: 'Study Environment', desc: 'Find a quiet, well-lit space free from distractions. Keep it organized and comfortable.' },
        { title: 'Sleep Well', desc: 'Get 7-9 hours of sleep, especially the night before an exam. Sleep consolidates memory.' },
        { title: 'Healthy Snacks', desc: 'Eat brain-boosting foods like nuts, fruits, and stay hydrated with water.' },
        { title: 'Review Old Exams', desc: 'Study previous years\' exam papers to understand question patterns and important topics.' },
        { title: 'Create Study Guides', desc: 'Summarize key concepts on one page for quick last-minute reviews before the exam.' },
      ]
    },
    'time-management': {
      title: 'Time Management',
      icon: '⏰',
      items: [
        { title: 'Eisenhower Matrix', desc: 'Prioritize tasks by urgency and importance. Focus on important, not just urgent tasks.' },
        { title: 'Set SMART Goals', desc: 'Make goals Specific, Measurable, Achievable, Relevant, and Time-bound.' },
        { title: 'Avoid Multitasking', desc: 'Focus on one task at a time for better quality and faster completion.' },
        { title: 'Use a Planner', desc: 'Write down all tasks, deadlines, and appointments. Review daily and weekly.' },
        { title: 'Learn to Say No', desc: 'Protect your time by declining non-essential commitments that don\'t align with your goals.' },
        { title: 'Buffer Time', desc: 'Add extra time between tasks to account for unexpected delays or overruns.' },
        { title: 'Set Deadlines', desc: 'Create artificial deadlines for tasks without them to maintain momentum and focus.' },
        { title: 'Track Your Time', desc: 'Use apps to track how you spend time and identify areas for improvement.' },
      ]
    },
    'wellness': {
      title: 'Student Wellness',
      icon: '💚',
      items: [
        { title: 'Regular Exercise', desc: '30 minutes of physical activity daily improves focus, mood, and memory.' },
        { title: 'Mindfulness & Meditation', desc: 'Practice 10 minutes of meditation daily to reduce stress and improve concentration.' },
        { title: 'Balanced Diet', desc: 'Eat regular meals with whole foods, fruits, vegetables, and lean proteins.' },
        { title: 'Social Connection', desc: 'Maintain friendships and social activities. Isolation can harm mental health.' },
        { title: 'Seek Help When Needed', desc: 'Don\'t hesitate to talk to counselors, mentors, or trusted adults about stress or challenges.' },
        { title: 'Work-Life Balance', desc: 'Schedule time for hobbies, relaxation, and activities you enjoy outside of studying.' },
        { title: 'Power Naps', desc: '20-minute naps can boost alertness and performance without affecting nighttime sleep.' },
        { title: 'Limit Caffeine', desc: 'Avoid excessive coffee/energy drinks. Stop caffeine intake 6 hours before bedtime.' },
      ]
    },
    'memory-skills': {
      title: 'Memory Enhancement',
      icon: '🧠',
      items: [
        { title: 'Mnemonics', desc: 'Use acronyms, rhymes, or songs to remember lists and complex information.' },
        { title: 'Memory Palace', desc: 'Associate information with specific locations in a familiar place to enhance recall.' },
        { title: 'Chunking', desc: 'Break large amounts of information into smaller, manageable chunks.' },
        { title: 'Visualization', desc: 'Create mental images of concepts to make them more memorable and vivid.' },
        { title: 'Teach Others', desc: 'Explaining concepts to others reinforces your own understanding and memory.' },
        { title: 'Use Multiple Senses', desc: 'Engage sight, sound, and touch when learning to create stronger memory pathways.' },
        { title: 'Sleep After Learning', desc: 'Review material before sleep. Your brain consolidates memories during sleep.' },
        { title: 'Stay Hydrated', desc: 'Dehydration impairs concentration and memory. Drink 8 glasses of water daily.' },
      ]
    },
    'focus-concentration': {
      title: 'Focus & Concentration',
      icon: '🎯',
      items: [
        { title: 'Remove Distractions', desc: 'Put phone in another room, use website blockers, create a dedicated study space.' },
        { title: 'Single-Tasking', desc: 'Complete one task fully before moving to the next. Quality over quantity.' },
        { title: 'Music for Focus', desc: 'Try instrumental, classical, or lo-fi music. Avoid music with lyrics when studying.' },
        { title: 'Natural Light', desc: 'Study near windows when possible. Natural light improves alertness and mood.' },
        { title: 'Regular Breaks', desc: 'Take 5-10 minute breaks every hour to prevent mental fatigue.' },
        { title: 'Deep Work Sessions', desc: 'Schedule 90-minute blocks of uninterrupted, focused work on important tasks.' },
        { title: 'Brain Games', desc: 'Play puzzles, chess, or memory games to strengthen concentration muscles.' },
        { title: 'Mindfulness Practice', desc: 'Train your attention through meditation to improve focus in studies.' },
      ]
    },
    'career-planning': {
      title: 'Career & Future Planning',
      icon: '🚀',
      items: [
        { title: 'Explore Interests', desc: 'Take time to discover what subjects and activities truly excite you.' },
        { title: 'Build Skills', desc: 'Develop both hard skills (technical) and soft skills (communication, leadership).' },
        { title: 'Network Early', desc: 'Connect with professionals, join clubs, attend events in your field of interest.' },
        { title: 'Internships', desc: 'Gain real-world experience through internships, volunteering, or part-time work.' },
        { title: 'Personal Projects', desc: 'Create portfolios, blogs, or projects that showcase your skills and passion.' },
        { title: 'Mentorship', desc: 'Find mentors who can guide you based on their experience in your desired field.' },
        { title: 'Continuous Learning', desc: 'Stay updated with industry trends through online courses, books, and workshops.' },
        { title: 'Set Career Goals', desc: 'Define short-term and long-term career objectives and create action plans.' },
      ]
    },
  };

  const subjects = Object.keys(content).map(key => ({
    id: key,
    name: content[key].title,
    icon: content[key].icon
  }));

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
            <Link to="/quotes" className="navbar-link">Quotes</Link>
            <Link to="/gk" className="navbar-link active">G.K</Link>
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
          <h1>Student General Knowledge</h1>
          <p className="subtitle">Tips, tricks, and knowledge for academic success</p>
        </motion.div>

        {/* Subject Tabs */}
        <div className="subject-tabs">
          {subjects.map(subject => (
            <button
              key={subject.id}
              className={`subject-tab ${selectedSubject === subject.id ? 'active' : ''}`}
              onClick={() => setSelectedSubject(subject.id)}
            >
              <span className="tab-icon">{subject.icon}</span>
              {subject.name}
            </button>
          ))}
        </div>

        {/* Content Cards */}
        <div className="gk-grid">
          {content[selectedSubject].items.map((item, index) => (
            <motion.div
              key={index}
              className="gk-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleCardClick(item.title)}
            >
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="card-footer">
                <span className="read-more">Read More →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GK;
