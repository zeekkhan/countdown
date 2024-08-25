import React from 'react';
import './TaskSection.css';

const TaskSection = ({ title, tasks = [] }) => {
  return (
    <div className="task-section">
      <h2>{title}</h2>
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="task-meta">
                <small>Due: {task.dueDate}</small>
                <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskSection;
