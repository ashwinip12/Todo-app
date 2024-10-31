
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import './TaskDescriptionPage.module.scss';

const TaskDescriptionPage: React.FC = () => {
  const { id } = useParams();
  const taskId = id ? parseInt(id, 10) : 0;
  const task = useSelector((state: RootState) => state.tasks.tasks.find(task => task.id === taskId));

  if (!task) {
    return <p>Task not found.</p>;
  }

  return (
    <div>
      <h1>Task Description</h1>
      <p><strong>Content:</strong> {task.content}</p>
      <p><strong>Description:</strong> {task.description}</p>
    </div>
  );
};

export default TaskDescriptionPage;
