
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import taskReducer from './reducers';
import taskSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(taskReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(taskSaga);

export default store;
