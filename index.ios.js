import React, { Component } from 'react';
import {
  NavigatorIOS,
  AppRegistry,
} from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import reducers from './reducers';
import Timeline from './views/Timeline';
// import Post from './views/Topic';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Provider store={store}>
        <NavigatorIOS style={{ flex: 1 }}
          initialRoute={{ title: 'Python China', component: Timeline }}
        />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('PythonChina', () => Router);
