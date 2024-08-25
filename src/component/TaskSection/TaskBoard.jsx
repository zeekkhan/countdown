import React from 'react';
import TaskSection from './TaskSection';
import './TaskBoard.css';

const TaskBoard = () => {
  const todoTasks = [
    { title: 'Design UI', description: 'Create a modern UI for the app', dueDate: '2024-09-01', priority: 'High' },
    { title: 'Setup Firebase', description: 'Integrate Firebase into the app', dueDate: '2024-09-02', priority: 'Medium' }
  ];

  const inProgressTasks = [
    { title: 'Develop Authentication', description: 'Create login and signup features', dueDate: '2024-08-30', priority: 'High' }
  ];

  const completedTasks = [
    { title: 'Project Planning', description: 'Outline the project requirements and plan', dueDate: '2024-08-20', priority: 'Low' }
  ];

  return (
    <div className="task-board">
      <TaskSection title="To Do" tasks={todoTasks} />
      <TaskSection title="In Progress" tasks={inProgressTasks} />
      <TaskSection title="Completed" tasks={completedTasks} />
    </div>
  );
};

export default TaskBoard;
