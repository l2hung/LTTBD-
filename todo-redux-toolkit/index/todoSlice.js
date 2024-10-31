
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    setTasks: (state, action) => {
      return action.payload;
    },
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, deleteTask } = todoSlice.actions;

export default todoSlice.reducer;
