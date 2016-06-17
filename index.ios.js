import React, { Component } from 'react';
import {
  NavigatorIOS,
  AppRegistry,
} from 'react-native';

import Timeline from './views/Timeline';
// import Post from './views/Topic';

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <NavigatorIOS
        style={{ flex: 1 }}
        initialRoute={{ title: 'Python China', component: Timeline }}
      />
    );
  }
}

AppRegistry.registerComponent('PythonChina', () => Router);
