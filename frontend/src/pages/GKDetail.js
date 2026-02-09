// frontend/src/pages/GKDetail.js
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './InfoPages.css';

const GKDetail = () => {
  const { topic } = useParams();
  const navigate = useNavigate();

  const topicDetails = {
    // ──────────────────────────────────────────────
    // Study Tips & Techniques
    // ──────────────────────────────────────────────
    'pomodoro-technique': {
      title: 'Pomodoro Technique',
      icon: '🍅',
      category: 'Study Tips & Techniques',
      introduction: 'A time management method that breaks work into focused intervals (typically 25 minutes) separated by short breaks.',
      howItWorks: [
        'Choose one task',
        'Set a timer for 25 minutes',
        'Work with full focus until the timer ends',
        'Take a 5-minute break',
        'After 4 cycles, take a longer 15–30 minute break'
      ],
      benefits: [
        'Boosts focus and concentration',
        'Reduces mental fatigue',
        'Helps overcome procrastination',
        'Makes large tasks feel more manageable'
      ],
      tips: [
        'Eliminate distractions during work intervals',
        'Use breaks for light movement (not screens)',
        'Track your completed Pomodoros'
      ],
      commonMistakes: ['Skipping breaks', 'Multitasking', 'Ignoring the timer'],
      tools: ['Forest', 'Focus To-Do', 'Pomofocus', 'Tomato Timer']
    },

    'active-recall': {
      title: 'Active Recall',
      icon: '🧠',
      category: 'Study Tips & Techniques',
      introduction: 'Testing yourself to retrieve information from memory instead of passively re-reading notes.',
      howItWorks: [
        'Study material once',
        'Close notes and try to recall',
        'Write or say everything you remember',
        'Check accuracy and review gaps'
      ],
      benefits: ['Stronger long-term retention', 'Better exam performance', 'Identifies weak areas quickly'],
      tips: ['Use flashcards', 'Self-quizzing', 'Teach someone else'],
      commonMistakes: ['Looking at answers too soon', 'Only doing it once'],
      tools: ['Anki', 'Quizlet', 'Paper flashcards']
    },

    'spaced-repetition': {
      title: 'Spaced Repetition',
      icon: '📅',
      category: 'Study Tips & Techniques',
      introduction: 'Reviewing material at increasing intervals to move it into long-term memory efficiently.',
      howItWorks: ['Learn → Review after 1 day → 3–7 days → 2–4 weeks → monthly'],
      benefits: ['Excellent retention', 'Less total study time', 'Reduces cramming'],
      tips: ['Use scheduling apps', 'Be honest about difficulty'],
      commonMistakes: ['Reviewing too frequently', 'Skipping sessions'],
      tools: ['Anki', 'RemNote', 'Quizlet']
    },

    'feynman-technique': {
      title: 'Feynman Technique',
      icon: '👨‍🏫',
      category: 'Study Tips & Techniques',
      introduction: 'Explain concepts simply as if teaching a child to reveal true understanding.',
      howItWorks: ['Choose topic', 'Explain simply', 'Find gaps', 'Simplify further', 'Repeat'],
      benefits: ['Deep understanding', 'Exposes weaknesses', 'Improves teaching skill'],
      tips: ['Speak out loud', 'Use analogies'],
      commonMistakes: ['Using jargon', 'Skipping hard parts'],
      tools: ['Notebook', 'Whiteboard']
    },

    'mind-mapping': {
      title: 'Mind Mapping',
      icon: '🗺️',
      category: 'Study Tips & Techniques',
      introduction: 'Visual organization of ideas around a central topic using branches and images.',
      howItWorks: ['Central idea → main branches → sub-branches → details'],
      benefits: ['Great for visual learners', 'Shows connections', 'Quick overview'],
      tips: ['Use keywords', 'Add colors & drawings'],
      commonMistakes: ['Too much text', 'Making it too perfect'],
      tools: ['XMind', 'MindMeister', 'Paper + pens']
    },

    'study-groups': {
      title: 'Study Groups',
      icon: '👥',
      category: 'Study Tips & Techniques',
      introduction: 'Collaborative learning with peers through discussion and teaching.',
      howItWorks: ['Form small group', 'Set agenda', 'Teach & quiz each other'],
      benefits: ['Multiple perspectives', 'Fills gaps', 'Increases motivation'],
      tips: ['Keep group small', 'Stay on task'],
      commonMistakes: ['Socializing instead of studying'],
      tools: ['Zoom', 'Discord', 'Shared Docs']
    },

    'cornell-note-taking': {
      title: 'Cornell Note-Taking',
      icon: '📝',
      category: 'Study Tips & Techniques',
      introduction: 'Structured note system with cues, notes, and summary sections.',
      howItWorks: ['Divide page', 'Take notes', 'Add cues/questions', 'Summarize'],
      benefits: ['Organized notes', 'Built-in review', 'Better retention'],
      tips: ['Review within 24h', 'Use own words'],
      commonMistakes: ['Skipping summary/cues'],
      tools: ['Cornell template']
    },

    'sq3r-method': {
      title: 'SQ3R Method',
      icon: '🔍',
      category: 'Study Tips & Techniques',
      introduction: 'Active reading strategy: Survey, Question, Read, Recite, Review.',
      howItWorks: ['Survey → Question → Read → Recite → Review'],
      benefits: ['Better comprehension', 'Active engagement', 'Improved retention'],
      tips: ['Write questions first', 'Short sessions'],
      commonMistakes: ['Skipping steps', 'Passive reading'],
      tools: ['Notebook', 'Textbook']
    },

    // ──────────────────────────────────────────────
    // Productivity Hacks
    // ──────────────────────────────────────────────
    'eat-the-frog': {
      title: 'Eat the Frog',
      icon: '🐸',
      category: 'Productivity Hacks',
      introduction: 'Do your most difficult task first thing in the morning.',
      howItWorks: ['Identify hardest task', 'Do it first'],
      benefits: ['Reduces anxiety', 'Creates momentum', 'Uses peak energy'],
      tips: ['Plan night before', 'Break into steps'],
      commonMistakes: ['Doing easy tasks first'],
      tools: ['To-do list', 'Calendar']
    },

    'two-minute-rule': {
      title: 'Two-Minute Rule',
      icon: '⏱️',
      category: 'Productivity Hacks',
      introduction: 'If a task takes less than 2 minutes, do it immediately.',
      howItWorks: ['Task < 2 min? → Do it now'],
      benefits: ['Clears small tasks', 'Prevents backlog', 'Builds momentum'],
      tips: ['Apply to emails & quick replies'],
      commonMistakes: ['Overestimating time'],
      tools: []
    },

    'time-blocking': {
      title: 'Time Blocking',
      icon: '🗓️',
      category: 'Productivity Hacks',
      introduction: 'Assign specific time slots to tasks in your calendar.',
      howItWorks: ['Plan day in advance', 'Block time for each task'],
      benefits: ['Protects focus', 'Reduces decisions', 'Better balance'],
      tips: ['Add buffer time', 'Review weekly'],
      commonMistakes: ['Over-scheduling'],
      tools: ['Google Calendar', 'Notion']
    },

    'digital-detox': {
      title: 'Digital Detox',
      icon: '📴',
      category: 'Productivity Hacks',
      introduction: 'Intentionally reducing screen time to improve focus and mental clarity.',
      howItWorks: ['Set specific times for checking devices', 'Use focus mode', 'Create device-free zones'],
      benefits: ['Improved concentration', 'Less stress', 'Better sleep'],
      tips: ['Start with 1–2 hours daily', 'Replace scrolling with reading/walking'],
      commonMistakes: ['Checking phone during breaks'],
      tools: ['Screen Time', 'Freedom', 'Forest']
    },

    'morning-routine': {
      title: 'Morning Routine',
      icon: '☀️',
      category: 'Productivity Hacks',
      introduction: 'A consistent set of morning habits to start the day with energy and intention.',
      howItWorks: ['Wake up → Exercise/meditation → Healthy breakfast → Plan day'],
      benefits: ['Sets positive tone', 'Increases productivity', 'Reduces decision fatigue'],
      tips: ['Prepare the night before', 'Keep it simple (20–60 min)'],
      commonMistakes: ['Checking phone first thing'],
      tools: ['Alarmy', 'Habit tracker']
    },

    'weekly-review': {
      title: 'Weekly Review',
      icon: '🔄',
      category: 'Productivity Hacks',
      introduction: 'A regular time to reflect on past week and plan the next.',
      howItWorks: ['Review tasks completed', 'Clear inbox/notes', 'Plan next week'],
      benefits: ['Clarity', 'Better planning', 'Reduces stress'],
      tips: ['Do it Sunday evening', '30–60 minutes'],
      commonMistakes: ['Skipping it'],
      tools: ['Notion', 'Todoist', 'Notebook']
    },

    'batch-processing': {
      title: 'Batch Processing',
      icon: '📬',
      category: 'Productivity Hacks',
      introduction: 'Grouping similar tasks and doing them together to reduce context switching.',
      howItWorks: ['Collect similar tasks', 'Do them in one block'],
      benefits: ['More efficient', 'Less mental fatigue', 'Faster completion'],
      tips: ['Batch emails, messages, errands'],
      commonMistakes: ['Doing them randomly'],
      tools: ['Calendar blocks']
    },

    '80/20-rule': {
      title: '80/20 Rule (Pareto Principle)',
      icon: '📊',
      category: 'Productivity Hacks',
      introduction: '80% of results come from 20% of efforts — focus on high-impact tasks.',
      howItWorks: ['Identify high-value 20%', 'Prioritize those tasks'],
      benefits: ['Maximizes results', 'Reduces wasted time'],
      tips: ['Ask: What gives most value?', 'Cut low-impact activities'],
      commonMistakes: ['Trying to do everything'],
      tools: ['Priority list']
    },

    // ──────────────────────────────────────────────
    // Exam Preparation
    // ──────────────────────────────────────────────
    'start-early': {
      title: 'Start Early',
      icon: '⏳',
      category: 'Exam Preparation',
      introduction: 'Begin studying well in advance instead of cramming at the last minute.',
      howItWorks: ['Plan study schedule 2–3 weeks ahead', 'Break material into daily chunks'],
      benefits: ['Less stress', 'Better retention', 'Deeper understanding'],
      tips: ['Start with weakest topics', 'Use spaced repetition'],
      commonMistakes: ['Waiting until last week'],
      tools: ['Calendar', 'Study planner']
    },

    'practice-tests': {
      title: 'Practice Tests',
      icon: '📝',
      category: 'Exam Preparation',
      introduction: 'Take timed practice exams to simulate real test conditions.',
      howItWorks: ['Find past papers', 'Time yourself', 'Review mistakes carefully'],
      benefits: ['Familiarity with format', 'Improves time management', 'Reduces anxiety'],
      tips: ['Do under exam conditions', 'Analyze wrong answers'],
      commonMistakes: ['Only reading answers'],
      tools: ['Past papers', 'Timer']
    },

    'understand-dont-memorize': {
      title: 'Understand, Don’t Memorize',
      icon: '💡',
      category: 'Exam Preparation',
      introduction: 'Focus on truly understanding concepts rather than rote memorization.',
      howItWorks: ['Ask why/how questions', 'Make connections', 'Use Feynman method'],
      benefits: ['Longer retention', 'Better problem-solving', 'Easier to recall'],
      tips: ['Explain in own words', 'Use diagrams'],
      commonMistakes: ['Just memorizing facts'],
      tools: ['Mind maps', 'Notes']
    },

    'study-environment': {
      title: 'Study Environment',
      icon: '🪑',
      category: 'Exam Preparation',
      introduction: 'Create an optimal space that supports focus and reduces distractions.',
      howItWorks: ['Quiet, well-lit area', 'Organized desk', 'Comfortable chair'],
      benefits: ['Better concentration', 'Less procrastination'],
      tips: ['Remove phone', 'Use noise-cancelling if needed'],
      commonMistakes: ['Studying in bed'],
      tools: ['Desk organizer']
    },

    'sleep-well': {
      title: 'Sleep Well',
      icon: '😴',
      category: 'Exam Preparation',
      introduction: 'Get 7–9 hours of quality sleep, especially before exams.',
      howItWorks: ['Consistent sleep schedule', 'Avoid screens before bed'],
      benefits: ['Memory consolidation', 'Better focus', 'Reduced stress'],
      tips: ['No all-nighters', 'Relaxing bedtime routine'],
      commonMistakes: ['Pulling all-nighters'],
      tools: ['Sleep tracker']
    },

    'healthy-snacks': {
      title: 'Healthy Snacks',
      icon: '🥜',
      category: 'Exam Preparation',
      introduction: 'Eat brain-boosting foods to maintain energy and focus.',
      howItWorks: ['Choose nuts, fruits, yogurt, dark chocolate'],
      benefits: ['Stable energy', 'Better concentration', 'Improved mood'],
      tips: ['Stay hydrated', 'Avoid heavy/sugary food'],
      commonMistakes: ['Eating junk food'],
      tools: ['Water bottle']
    },

    'review-old-exams': {
      title: 'Review Old Exams',
      icon: '📚',
      category: 'Exam Preparation',
      introduction: 'Study previous years’ papers to understand patterns and important topics.',
      howItWorks: ['Collect old papers', 'Solve them', 'Analyze trends'],
      benefits: ['Knows question style', 'Identifies key topics'],
      tips: ['Time yourself', 'Note repeated topics'],
      commonMistakes: ['Only reading answers'],
      tools: ['Old question papers']
    },

    'create-study-guides': {
      title: 'Create Study Guides',
      icon: '📖',
      category: 'Exam Preparation',
      introduction: 'Summarize key concepts on one page for quick review.',
      howItWorks: ['Condense notes', 'Use bullet points & diagrams'],
      benefits: ['Quick revision', 'Better overview'],
      tips: ['One page per topic', 'Use colors'],
      commonMistakes: ['Copying everything'],
      tools: ['Notion', 'Paper']
    },

    // ──────────────────────────────────────────────
    // Time Management
    // ──────────────────────────────────────────────
    'eisenhower-matrix': {
      title: 'Eisenhower Matrix',
      icon: '📊',
      category: 'Time Management',
      introduction: 'Prioritize tasks based on urgency and importance using a 2×2 grid.',
      howItWorks: [
        'Do: Urgent + Important',
        'Schedule: Important + Not Urgent',
        'Delegate: Urgent + Not Important',
        'Delete: Not Urgent + Not Important'
      ],
      benefits: ['Focus on what matters', 'Reduces stress'],
      tips: ['Review daily', 'Spend time in quadrant 2'],
      commonMistakes: ['Doing everything urgent'],
      tools: ['Paper grid', 'Todoist']
    },

    'set-smart-goals': {
      title: 'Set SMART Goals',
      icon: '🎯',
      category: 'Time Management',
      introduction: 'Make goals Specific, Measurable, Achievable, Relevant, Time-bound.',
      howItWorks: ['Define clear, trackable goals with deadlines'],
      benefits: ['Clarity', 'Motivation', 'Better progress tracking'],
      tips: ['Write them down', 'Break into steps'],
      commonMistakes: ['Vague goals'],
      tools: ['Notebook', 'Notion']
    },

    'avoid-multitasking': {
      title: 'Avoid Multitasking',
      icon: '🚫',
      category: 'Time Management',
      introduction: 'Focus on one task at a time for better quality and speed.',
      howItWorks: ['Pick one task', 'Complete it before switching'],
      benefits: ['Higher quality work', 'Less mental fatigue'],
      tips: ['Use Pomodoro', 'Close extra tabs'],
      commonMistakes: ['Switching tasks constantly'],
      tools: ['Focus mode']
    },

    'use-a-planner': {
      title: 'Use a Planner',
      icon: '📅',
      category: 'Time Management',
      introduction: 'Write down tasks, deadlines and appointments in one place.',
      howItWorks: ['Daily/weekly planning', 'Review regularly'],
      benefits: ['Nothing forgotten', 'Better organization'],
      tips: ['Review every evening', 'Prioritize'],
      commonMistakes: ['Not reviewing planner'],
      tools: ['Google Calendar', 'Paper planner']
    },

    'learn-to-say-no': {
      title: 'Learn to Say No',
      icon: '🙅',
      category: 'Time Management',
      introduction: 'Protect your time by declining non-essential commitments.',
      howItWorks: ['Evaluate requests against your goals', 'Politely decline when needed'],
      benefits: ['More time for priorities', 'Less stress'],
      tips: ['Use "I’d love to, but..."', 'Don’t feel guilty'],
      commonMistakes: ['Saying yes to everything'],
      tools: []
    },

    'buffer-time': {
      title: 'Buffer Time',
      icon: '⏱️',
      category: 'Time Management',
      introduction: 'Add extra time between tasks for delays or overruns.',
      howItWorks: ['Schedule 10–15 min buffers'],
      benefits: ['Reduces stress', 'Prevents schedule collapse'],
      tips: ['Especially for travel/meetings'],
      commonMistakes: ['Back-to-back scheduling'],
      tools: ['Calendar']
    },

    'set-deadlines': {
      title: 'Set Deadlines',
      icon: '⏰',
      category: 'Time Management',
      introduction: 'Create artificial deadlines for tasks without them.',
      howItWorks: ['Assign due dates even for open tasks'],
      benefits: ['Creates urgency', 'Improves completion rate'],
      tips: ['Make them realistic', 'Use reminders'],
      commonMistakes: ['No deadlines at all'],
      tools: ['Todoist', 'Calendar']
    },

    'track-your-time': {
      title: 'Track Your Time',
      icon: '⏳',
      category: 'Time Management',
      introduction: 'Monitor how you spend time to identify inefficiencies.',
      howItWorks: ['Log activities for a week', 'Analyze patterns'],
      benefits: ['Find time-wasters', 'Improve planning'],
      tips: ['Use simple tracker', 'Be honest'],
      commonMistakes: ['Guessing instead of tracking'],
      tools: ['Toggl', 'Clockify']
    },

    // ──────────────────────────────────────────────
    // Student Wellness
    // ──────────────────────────────────────────────
    'regular-exercise': {
      title: 'Regular Exercise',
      icon: '🏃',
      category: 'Student Wellness',
      introduction: '30 minutes of daily physical activity to improve brain function.',
      howItWorks: ['Walk, jog, stretch, or gym daily'],
      benefits: ['Better focus', 'Improved mood', 'Reduced stress'],
      tips: ['Start small', 'Make it enjoyable'],
      commonMistakes: ['No movement all day'],
      tools: ['YouTube workouts']
    },

    'mindfulness-meditation': {
      title: 'Mindfulness & Meditation',
      icon: '🧘',
      category: 'Student Wellness',
      introduction: 'Short daily practice to reduce stress and improve focus.',
      howItWorks: ['Sit quietly 5–10 min', 'Focus on breath'],
      benefits: ['Less anxiety', 'Better attention', 'Emotional regulation'],
      tips: ['Use guided apps', 'Start with 5 min'],
      commonMistakes: ['Expecting instant calm'],
      tools: ['Headspace', 'Calm']
    },

    'balanced-diet': {
      title: 'Balanced Diet',
      icon: '🥗',
      category: 'Student Wellness',
      introduction: 'Eat whole foods to fuel brain and body.',
      howItWorks: ['Include fruits, veggies, proteins, healthy fats'],
      benefits: ['Stable energy', 'Better memory', 'Mood stability'],
      tips: ['Prepare meals ahead', 'Limit processed food'],
      commonMistakes: ['Skipping meals'],
      tools: []
    },

    'social-connection': {
      title: 'Social Connection',
      icon: '👫',
      category: 'Student Wellness',
      introduction: 'Maintain friendships and social activities.',
      howItWorks: ['Call friends', 'Meet people regularly'],
      benefits: ['Reduced loneliness', 'Emotional support'],
      tips: ['Schedule regular catch-ups'],
      commonMistakes: ['Isolating during stress'],
      tools: ['WhatsApp', 'Discord']
    },

    'seek-help-when-needed': {
      title: 'Seek Help When Needed',
      icon: '🤝',
      category: 'Student Wellness',
      introduction: 'Talk to someone when feeling overwhelmed.',
      howItWorks: ['Reach out to friends, family, counselor'],
      benefits: ['Relieves pressure', 'New perspectives'],
      tips: ['Don’t wait until crisis'],
      commonMistakes: ['Suffering in silence'],
      tools: ['School counselor']
    },

    'work-life-balance': {
      title: 'Work-Life Balance',
      icon: '⚖️',
      category: 'Student Wellness',
      introduction: 'Make time for hobbies and relaxation.',
      howItWorks: ['Schedule non-study time'],
      benefits: ['Prevents burnout', 'Better performance'],
      tips: ['Protect hobby time'],
      commonMistakes: ['All study, no play'],
      tools: ['Calendar']
    },

    'power-naps': {
      title: 'Power Naps',
      icon: '😴',
      category: 'Student Wellness',
      introduction: 'Short 20-minute naps to boost alertness.',
      howItWorks: ['Nap 10–30 minutes'],
      benefits: ['Improved focus', 'Memory boost'],
      tips: ['Set alarm', 'Early afternoon best'],
      commonMistakes: ['Long naps'],
      tools: ['Alarm']
    },

    'limit-caffeine': {
      title: 'Limit Caffeine',
      icon: '☕',
      category: 'Student Wellness',
      introduction: 'Avoid excessive caffeine to prevent crashes.',
      howItWorks: ['1–2 cups max', 'Stop 6–8 hours before bed'],
      benefits: ['Better sleep', 'Stable energy'],
      tips: ['Switch to water/herbal tea later'],
      commonMistakes: ['Late afternoon coffee'],
      tools: []
    },

    // ──────────────────────────────────────────────
    // Memory Enhancement
    // ──────────────────────────────────────────────
    'mnemonics': {
      title: 'Mnemonics',
      icon: '🔤',
      category: 'Memory Enhancement',
      introduction: 'Use acronyms, rhymes or songs to remember lists.',
      howItWorks: ['Create memorable phrase for list items'],
      benefits: ['Easy recall of ordered info'],
      tips: ['Make it funny/silly'],
      commonMistakes: ['Too complicated'],
      tools: []
    },

    'memory-palace': {
      title: 'Memory Palace',
      icon: '🏛️',
      category: 'Memory Enhancement',
      introduction: 'Associate information with locations in a familiar place.',
      howItWorks: ['Walk through known place', 'Place items in locations'],
      benefits: ['Excellent for sequences/lists'],
      tips: ['Use childhood home'],
      commonMistakes: ['Overlapping images'],
      tools: []
    },

    'chunking': {
      title: 'Chunking',
      icon: '🧩',
      category: 'Memory Enhancement',
      introduction: 'Break large information into smaller meaningful groups.',
      howItWorks: ['Group related items'],
      benefits: ['Easier to remember'],
      tips: ['Phone numbers, formulas'],
      commonMistakes: ['Random grouping'],
      tools: []
    },

    'visualization': {
      title: 'Visualization',
      icon: '🎨',
      category: 'Memory Enhancement',
      introduction: 'Create vivid mental images of concepts.',
      howItWorks: ['Turn abstract info into pictures'],
      benefits: ['Stronger memory traces'],
      tips: ['Make images exaggerated/funny'],
      commonMistakes: ['Boring images'],
      tools: []
    },

    'teach-others': {
      title: 'Teach Others',
      icon: '📢',
      category: 'Memory Enhancement',
      introduction: 'Explaining material to others reinforces your understanding.',
      howItWorks: ['Teach a friend or imaginary student'],
      benefits: ['Reveals gaps', 'Strengthens memory'],
      tips: ['Use simple language'],
      commonMistakes: ['Not actually explaining'],
      tools: []
    },

    'use-multiple-senses': {
      title: 'Use Multiple Senses',
      icon: '👀👂',
      category: 'Memory Enhancement',
      introduction: 'Engage sight, sound, touch when learning.',
      howItWorks: ['Read, say aloud, write'],
      benefits: ['Stronger memory pathways'],
      tips: ['Say formulas aloud while writing'],
      commonMistakes: ['Only reading'],
      tools: []
    },

    'sleep-after-learning': {
      title: 'Sleep After Learning',
      icon: '🛌',
      category: 'Memory Enhancement',
      introduction: 'Review material before sleep — brain consolidates memories overnight.',
      howItWorks: ['Study → Sleep → Review next day'],
      benefits: ['Better retention'],
      tips: ['Avoid screens before bed'],
      commonMistakes: ['Late-night cramming'],
      tools: []
    },

    'stay-hydrated': {
      title: 'Stay Hydrated',
      icon: '💧',
      category: 'Memory Enhancement',
      introduction: 'Drink enough water — dehydration impairs concentration and memory.',
      howItWorks: ['Drink 2–3 liters daily'],
      benefits: ['Clearer thinking'],
      tips: ['Keep water bottle nearby'],
      commonMistakes: ['Drinking only when thirsty'],
      tools: ['Water bottle']
    },

    // ──────────────────────────────────────────────
    // Focus & Concentration
    // ──────────────────────────────────────────────
    'remove-distractions': {
      title: 'Remove Distractions',
      icon: '🚫',
      category: 'Focus & Concentration',
      introduction: 'Create a distraction-free environment for deep work.',
      howItWorks: ['Phone away', 'Website blockers', 'Dedicated space'],
      benefits: ['Longer focus periods'],
      tips: ['Use focus apps'],
      commonMistakes: ['Phone on desk'],
      tools: ['Freedom', 'Cold Turkey']
    },

    'single-tasking': {
      title: 'Single-Tasking',
      icon: '🎯',
      category: 'Focus & Concentration',
      introduction: 'Complete one task fully before moving to the next.',
      howItWorks: ['One task at a time'],
      benefits: ['Higher quality', 'Faster completion'],
      tips: ['Close extra tabs'],
      commonMistakes: ['Multitasking'],
      tools: []
    },

    'music-for-focus': {
      title: 'Music for Focus',
      icon: '🎧',
      category: 'Focus & Concentration',
      introduction: 'Use instrumental music to aid concentration.',
      howItWorks: ['Play lo-fi, classical, ambient sounds'],
      benefits: ['Blocks background noise', 'Improves mood'],
      tips: ['No lyrics'],
      commonMistakes: ['Distracting music'],
      tools: ['Brain.fm', 'YouTube lo-fi']
    },

    'natural-light': {
      title: 'Natural Light',
      icon: '☀️',
      category: 'Focus & Concentration',
      introduction: 'Study near windows to improve alertness and mood.',
      howItWorks: ['Position desk near light source'],
      benefits: ['Better mood', 'Improved focus'],
      tips: ['Open curtains'],
      commonMistakes: ['Dark room'],
      tools: []
    },

    'regular-breaks': {
      title: 'Regular Breaks',
      icon: '⏸️',
      category: 'Focus & Concentration',
      introduction: 'Take short breaks every 45–60 minutes.',
      howItWorks: ['Work → 5–10 min break'],
      benefits: ['Prevents burnout'],
      tips: ['Move during breaks'],
      commonMistakes: ['No breaks'],
      tools: ['Pomodoro timer']
    },

    'deep-work-sessions': {
      title: 'Deep Work Sessions',
      icon: '🔥',
      category: 'Focus & Concentration',
      introduction: 'Schedule 90-minute blocks of uninterrupted focused work.',
      howItWorks: ['Block time', 'No interruptions'],
      benefits: ['High-value output'],
      tips: ['Inform others'],
      commonMistakes: ['Checking phone'],
      tools: ['Calendar']
    },

    'brain-games': {
      title: 'Brain Games',
      icon: '♟️',
      category: 'Focus & Concentration',
      introduction: 'Play puzzles or strategy games to train attention.',
      howItWorks: ['Daily short sessions'],
      benefits: ['Stronger concentration muscles'],
      tips: ['Chess, Sudoku, Lumosity'],
      commonMistakes: ['Overdoing it'],
      tools: ['Chess.com', 'Lumosity']
    },

    'mindfulness-practice': {
      title: 'Mindfulness Practice',
      icon: '🧘',
      category: 'Focus & Concentration',
      introduction: 'Train attention through short daily meditation.',
      howItWorks: ['5–10 min daily breathing focus'],
      benefits: ['Improved focus', 'Less mind-wandering'],
      tips: ['Start small'],
      commonMistakes: ['Expecting instant results'],
      tools: ['Headspace', 'Calm']
    },

    // ──────────────────────────────────────────────
    // Career & Future Planning
    // ──────────────────────────────────────────────
    'explore-interests': {
      title: 'Explore Interests',
      icon: '🔍',
      category: 'Career & Future Planning',
      introduction: 'Take time to discover what truly excites you.',
      howItWorks: ['Try different subjects/activities', 'Reflect on enjoyment'],
      benefits: ['Clearer direction', 'More motivation'],
      tips: ['Join clubs', 'Take short courses'],
      commonMistakes: ['Following others’ choices'],
      tools: []
    },

    'build-skills': {
      title: 'Build Skills',
      icon: '🛠️',
      category: 'Career & Future Planning',
      introduction: 'Develop both hard and soft skills that are in demand.',
      howItWorks: ['Online courses', 'Practice projects'],
      benefits: ['Better employability'],
      tips: ['Communication + technical skills'],
      commonMistakes: ['Only theoretical learning'],
      tools: ['Coursera', 'freeCodeCamp']
    },

    'network-early': {
      title: 'Network Early',
      icon: '🤝',
      category: 'Career & Future Planning',
      introduction: 'Connect with professionals in your field of interest.',
      howItWorks: ['Attend events', 'LinkedIn outreach'],
      benefits: ['Opportunities', 'Guidance'],
      tips: ['Be genuine', 'Follow up'],
      commonMistakes: ['Only asking for jobs'],
      tools: ['LinkedIn']
    },

    'internships': {
      title: 'Internships',
      icon: '💼',
      category: 'Career & Future Planning',
      introduction: 'Gain real-world experience through internships or volunteering.',
      howItWorks: ['Apply early', 'Do meaningful work'],
      benefits: ['Resume building', 'Clarifies career path'],
      tips: ['Even unpaid can be valuable'],
      commonMistakes: ['Waiting until final year'],
      tools: ['Internshala', 'LinkedIn']
    },

    'personal-projects': {
      title: 'Personal Projects',
      icon: '🖥️',
      category: 'Career & Future Planning',
      introduction: 'Create projects that showcase your skills and passion.',
      howItWorks: ['Build portfolio pieces'],
      benefits: ['Stands out to employers'],
      tips: ['Document process'],
      commonMistakes: ['No documentation'],
      tools: ['GitHub']
    },

    'mentorship': {
      title: 'Mentorship',
      icon: '🧑‍🏫',
      category: 'Career & Future Planning',
      introduction: 'Find experienced people to guide you.',
      howItWorks: ['Reach out respectfully', 'Ask specific questions'],
      benefits: ['Avoids common mistakes', 'Accelerates growth'],
      tips: ['Be prepared'],
      commonMistakes: ['Expecting instant help'],
      tools: ['LinkedIn']
    },

    'continuous-learning': {
      title: 'Continuous Learning',
      icon: '📚',
      category: 'Career & Future Planning',
      introduction: 'Stay updated with industry trends and skills.',
      howItWorks: ['Courses, books, podcasts'],
      benefits: ['Future-proof career'],
      tips: ['Dedicate time weekly'],
      commonMistakes: ['Stopping after college'],
      tools: ['Coursera', 'YouTube']
    },

    'set-career-goals': {
      title: 'Set Career Goals',
      icon: '🚀',
      category: 'Career & Future Planning',
      introduction: 'Define short-term and long-term career objectives.',
      howItWorks: ['Write SMART career goals', 'Break into steps'],
      benefits: ['Clear direction'],
      tips: ['Review every 6 months'],
      commonMistakes: ['No goals at all'],
      tools: ['Notion', 'Journal']
    }
  };

  const currentTopic = topicDetails[topic];

  if (!currentTopic) {
    return (
      <div className="info-page">
        <div className="error-container">
          <h1>Topic Not Found</h1>
          <p>Sorry, we don't have detailed content for "{topic}" yet.</p>
          <Link to="/gk" className="btn btn-primary">
            Back to G.K
          </Link>
        </div>
      </div>
    );
  }

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

      <div className="gk-detail-container">
        <div className="gk-detail-content">
          <motion.button
            className="back-button"
            onClick={() => navigate('/gk')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            ← Back to G.K
          </motion.button>

          <motion.div
            className="gk-detail-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="topic-icon-large">{currentTopic.icon}</div>
            <h1>{currentTopic.title}</h1>
            <p className="topic-category">{currentTopic.category}</p>
          </motion.div>

          <motion.section className="detail-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2>📖 What is it?</h2>
            <p className="intro-text">{currentTopic.introduction}</p>
          </motion.section>

          <motion.section className="detail-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <h2>⚙️ How It Works</h2>
            <ol className="steps-list">
              {currentTopic.howItWorks.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </motion.section>

          <motion.section className="detail-section highlight-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h2>✨ Benefits</h2>
            <ul className="benefits-list">
              {currentTopic.benefits.map((b, i) => <li key={i}>✓ {b}</li>)}
            </ul>
          </motion.section>

          <motion.section className="detail-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <h2>💡 Tips for Success</h2>
            <ul className="tips-list">
              {currentTopic.tips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </motion.section>

          <motion.section className="detail-section warning-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <h2>⚠️ Common Mistakes to Avoid</h2>
            <ul className="mistakes-list">
              {currentTopic.commonMistakes.map((m, i) => <li key={i}>✗ {m}</li>)}
            </ul>
          </motion.section>

          <motion.section className="detail-section tools-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <h2>🛠️ Recommended Tools</h2>
            <ul className="tools-list">
              {currentTopic.tools.map((tool, i) => <li key={i}>{tool}</li>)}
            </ul>
          </motion.section>

          <motion.div className="cta-box" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
            <h3>Ready to try {currentTopic.title}?</h3>
            <p>Start building better habits with Planify today!</p>
            <Link to="/register" className="btn btn-primary btn-large">
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GKDetail;