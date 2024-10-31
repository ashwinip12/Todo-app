import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addTask, removeTask, updateTask, toggleTask } from '../redux/slices/taskSlices';
import { useNavigate } from 'react-router-dom';
import styles from './TodoList.module.scss';

interface Task {
  id: number;
  content: string;
  description?: string;
  reminderTime?: string; // Add this line
  completed: boolean;
}


const TodoList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [taskText, setTaskText] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskReminder, setTaskReminder] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!showAlert) return;

    const timer = setTimeout(() => {
      if (tasks.length === 0) {
        alert("You haven't added any tasks yet. Please add a task to your list.");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [tasks, showAlert]);

  useEffect(() => {
    tasks.forEach(task => {
      if (task.reminderTime) {
        const [reminderHour, reminderMinute] = task.reminderTime.split(':').map(Number);
        const now = new Date();
        const reminderDate = new Date();
        reminderDate.setHours(reminderHour, reminderMinute, 0, 0);

        // Check if the reminder time is in the future
        if (reminderDate > now) {
          const initialTimeout = reminderDate.getTime() - now.getTime();
          
          const initialTimer = setTimeout(() => {
          console.log(` hloo ${initialTimeout}`)
            alert('Reminder: Time to complete your task!');

            // Set up recurring reminders every 10 minutes
            const intervalId = setInterval(() => {
              alert('Reminder: Time to complete your task!');
            }, 10 * 60 * 1000); // 10 minutes in milliseconds

            // Clean up interval when the task is completed or component unmounts
            return () => {
              clearInterval(intervalId);
            };
          }, initialTimeout);

          // Clean up timeout when the component unmounts
          return () => clearTimeout(initialTimer);
        }
      }
    });
  }, [tasks]);

  const handleAddOrUpdateTask = () => {
    if (taskText.trim()) {
      if (editingTask) {
        dispatch(updateTask({
          id: editingTask.id,
          content: taskText,
          description: taskDescription,
          reminderTime: taskReminder, // Include reminderTime in the update
          completed: editingTask.completed,
        }));
        setEditingTask(null);
      } else {
        // dispatch(addTask({
        //   content: taskText,
        //   description: taskDescription,
        //   reminderTime: taskReminder, // Include reminderTime when adding a new task
        // }));
        dispatch(addTask({
  id: new Date().getTime(), // Use timestamp as a unique ID
  content: taskText,
  description: taskDescription,
reminderTime: taskReminder ?? null, // Use null coalescing operator to default to null if not provided
  completed: false, // Newly added tasks should start as incomplete
}));

        setTaskText('');
        setTaskDescription('');
        setTaskReminder('');
      }
    } else {
      alert('Please add content before adding a task');
    }
  };

  const handleEditTask = (taskToEdit: Task) => {
    setTaskText(taskToEdit.content);
    setTaskDescription(taskToEdit.description || '');
    setTaskReminder(taskToEdit.reminderTime || '');
    setEditingTask(taskToEdit);
  };

  const handleRemoveTask = (id: number) => {
    dispatch(removeTask(id));
    alert('Task removed successfully!');
  };

  const handleToggleComplete = (id: number) => {
    dispatch(toggleTask(id));
    const task = tasks.find(t => t.id === id);
    if (task && !task.completed) {
      navigate('/success', { state: { taskContent: task.content } });
    }
  };

  useEffect(() => {
    if (tasks.length === 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [tasks]);

  const handleShowDescription = (id: number) => {
    navigate(`/description/${id}`);
  };

  const toggleMenu = (id: number) => {
    setActiveTaskId(activeTaskId === id ? null : id);
  };

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add or edit a task"
      />
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Add a description (optional)"
      />
      <input
        type="time"
        value={taskReminder}
        onChange={(e) => setTaskReminder(e.target.value)}
        placeholder="Set reminder time"
      />
      <button onClick={handleAddOrUpdateTask}>
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
              {t.content} {t.reminderTime && `- Reminder at ${t.reminderTime}`}
            </span>
            <div>
              <button onClick={() => toggleMenu(t.id)}>menu</button>
              {activeTaskId === t.id && (
                <div className={styles.menu}>
                  <div onClick={() => handleEditTask(t)}>Edit</div>
                  <div onClick={() => handleRemoveTask(t.id)}>Remove</div>
                  <div className='description' onClick={() => handleShowDescription(t.id)}>
                    Description
                  </div>
                  {!t.completed && <div onClick={() => handleToggleComplete(t.id)}>Complete</div>}
                </div>
              )}
            </div>
          </li>
        ))}

      </ul>
    </div>
  );
};

export default TodoList;
