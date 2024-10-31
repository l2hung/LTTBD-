import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './index/reducers'; 
import rootSaga from './index/saga'; 
import Screen1 from './components/Screen1'; 
import Screen2 from './components/Screen2'; 
import Screen3 from './components/Screen3'; 

const Stack = createStackNavigator();

// Khởi tạo Saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Chạy root saga
sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Screen1">
          <Stack.Screen
            name="Screen1"
            component={Screen1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Screen2"
            component={Screen2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Screen3"
            component={Screen3}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
