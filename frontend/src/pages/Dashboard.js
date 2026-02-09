import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'homework',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, tasksRes] = await Promise.all([
        taskService.getStats(),
        taskService.getAllTasks(),
      ]);
      setStats(statsRes.stats);
      setTasks(tasksRes.tasks);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await taskService.createTask(formData);
      toast.success('Task created successfully! 🎉');
      setShowModal(false);
      setFormData({
        title: '',
        description: '',
        category: 'homework',
        priority: 'medium',
        dueDate: '',
      });
      fetchData();
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleToggle = async (id) => {
    try {
      await taskService.toggleTask(id);
      fetchData();
      toast.success('Task updated!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        toast.success('Task deleted');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const getFilteredTasks = () => {
    if (filter === 'all') return tasks;
    if (filter === 'active') return tasks.filter((t) => !t.completed);
    if (filter === 'completed') return tasks.filter((t) => t.completed);
    if (filter === 'high') return tasks.filter((t) => t.priority === 'high' && !t.completed);
    return tasks;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);

    if (d.getTime() === today.getTime()) return 'Today';
    if (d.getTime() === today.getTime() + 86400000) return 'Tomorrow';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <div className="logo-nav">✓ Planify</div>
          </div>
          <div className="navbar-right">
            <div className="user-info">
              <img
                src={user?.avatar || 'https://ui-avatars.com/api/?background=4F46E5&color=fff&name=User'}
                alt="User"
                className="user-avatar"
              />
              <span className="user-name">{user?.name}</span>
            </div>
            <button onClick={handleLogout} className="btn btn-outline-small">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1>Welcome back, {user?.name}! 👋</h1>
            <p>Here's what's happening with your tasks today</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            ➕ Add New Task
          </button>
        </motion.div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <motion.div
            className="stat-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stat-icon total">📊</div>
            <div className="stat-info">
              <h3>{stats?.totalTasks || 0}</h3>
              <p>Total Tasks</p>
            </div>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-icon completed">✅</div>
            <div className="stat-info">
              <h3>{stats?.completedTasks || 0}</h3>
              <p>Completed</p>
            </div>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="stat-icon pending">⏳</div>
            <div className="stat-info">
              <h3>{stats?.pendingTasks || 0}</h3>
              <p>Pending</p>
            </div>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="stat-icon progress">
              <div className="progress-circle">
                <span>{stats?.completionRate || 0}%</span>
              </div>
            </div>
            <div className="stat-info">
              <h3>{stats?.completionRate || 0}%</h3>
              <p>Completion Rate</p>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="filter-section">
          <div className="filter-tabs">
            {['all', 'active', 'completed', 'high'].map((f) => (
              <button
                key={f}
                className={`filter-tab ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks List */}
        <div className="tasks-list">
          {getFilteredTasks().length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No tasks found</h3>
              <p>Add a new task to get started!</p>
            </div>
          ) : (
            getFilteredTasks().map((task, index) => (
              <motion.div
                key={task._id}
                className={`task-card ${task.completed ? 'completed' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="task-content">
                  <div className="task-header-row">
                    <h3 className="task-title">{task.title}</h3>
                    <div className="task-actions">
                      <button
                        onClick={() => handleToggle(task._id)}
                        className="btn-icon-task"
                        title={task.completed ? 'Mark as active' : 'Mark as complete'}
                      >
                        {task.completed ? '↩️' : '✓'}
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="btn-icon-task delete"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  {task.description && <p className="task-description">{task.description}</p>}
                  <div className="task-meta">
                    <span className={`badge badge-${task.priority}`}>
                      {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}{' '}
                      {task.priority}
                    </span>
                    <span className="badge badge-category">
                      {task.category === 'homework' ? '📝' : task.category === 'project' ? '💼' : task.category === 'exam' ? '📖' : task.category === 'reading' ? '📚' : '✨'}{' '}
                      {task.category}
                    </span>
                    <span className="badge badge-date">📅 {formatDate(task.dueDate)}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Modal for Adding Task */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="modal-header">
              <h2>Add New Task</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label">Task Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  placeholder="e.g., Complete Math Assignment"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  placeholder="Add details..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="homework">📝 Homework</option>
                    <option value="project">💼 Project</option>
                    <option value="exam">📖 Exam Prep</option>
                    <option value="reading">📚 Reading</option>
                    <option value="other">✨ Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select
                    name="priority"
                    className="form-select"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="high">🔴 High</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="low">🟢 Low</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  className="form-input"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
