
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Task {
//   description: any;
//   id: number;
//   content: string;
//   completed: boolean;
// }

// interface TaskState {
//   tasks: Task[];
// }

// const initialState: TaskState = {
//   tasks: [],
// };

// const taskSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
   
//      addTask(state, action: PayloadAction<{ content: string; description?: string }>) {
//       const newTask: Task = {
//         id: Date.now(),
//         content: action.payload.content,
//         description: action.payload.description,
//         completed: false,
//       };
//       state.tasks.push(newTask);
//     },
//     updateTask(state, action: PayloadAction<{ id: number; content: string }>) {
//       const { id, content } = action.payload;
//       const task = state.tasks.find(task => task.id === id);
//       if (task) {
//         task.content = content;
//       }
//     },
//     removeTask(state, action: PayloadAction<number>) {
//       state.tasks = state.tasks.filter(task => task.id !== action.payload);
//     },
//     toggleTask(state, action: PayloadAction<number>) {
//       const task = state.tasks.find(task => task.id === action.payload);
//       if (task) {
//         task.completed = !task.completed;
//       }
//     },
//   },
// });

// export const { addTask, updateTask, removeTask, toggleTask } = taskSlice.actions;

// export default taskSlice.reducer;


// taskSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  content: string;
  description?: string;
  reminderTime?: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    removeTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTask(state, action: PayloadAction<number>) {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});
                                                                                                                                               
export const { addTask, updateTask, removeTask, toggleTask } = taskSlice.actions;

export default taskSlice.reducer;
