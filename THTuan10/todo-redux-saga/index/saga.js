
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_TASKS, SET_TASKS, ADD_TASK, DELETE_TASK, fetchTasks, setTasks } from './actions';

const API_URL = 'https://67100630a85f4164ef2cd231.mockapi.io/todo';

function* fetchTasksSaga() {
  try {
    const response = yield call(axios.get, API_URL);
    yield put(setTasks(response.data));
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

function* addTaskSaga(action) {
  try {
    const response = yield call(axios.post, API_URL, action.payload);
    yield put(fetchTasks());
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

function* deleteTaskSaga(action) {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload}`);
    yield put(fetchTasks());
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

export default function* taskSaga() {
  yield takeEvery(FETCH_TASKS, fetchTasksSaga);
  yield takeEvery(ADD_TASK, addTaskSaga);
  yield takeEvery(DELETE_TASK, deleteTaskSaga);
}
