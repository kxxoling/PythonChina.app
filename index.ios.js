'use strict';
import React, {
  NavigatorIOS,
  AppRegistry,
  createClass,
} from 'react-native';

import Timeline from './views/Timeline';
import Post from './views/Post';

var Router = createClass({
  render () {
    return (
      <NavigatorIOS style={{flex: 1}}
        initialRoute={{ title: 'Python China', component: Timeline }}
      />
    )
  },
})

AppRegistry.registerComponent('PythonChina', () => Router);
