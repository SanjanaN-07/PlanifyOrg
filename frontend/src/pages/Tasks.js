import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Tasks Page</h1>
      <p>This is a placeholder for additional tasks features.</p>
      <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </button>
    </div>
  );
};

export default Tasks;
