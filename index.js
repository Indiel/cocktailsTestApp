import {AppRegistry} from 'react-native';

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './src/reducers/reducer';

import App from './App';
import {name as appName} from './app.json';

const store = createStore(reducer, applyMiddleware(thunk));

const AppWithRedux = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => AppWithRedux);
