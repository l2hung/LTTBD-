
export const FETCH_TASKS = 'FETCH_TASKS';
export const SET_TASKS = 'SET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const fetchTasks = () => ({ type: FETCH_TASKS });
export const setTasks = (tasks) => ({ type: SET_TASKS, payload: tasks });
export const addTask = (task) => ({ type: ADD_TASK, payload: task });
export const deleteTask = (id) => ({ type: DELETE_TASK, payload: id });
