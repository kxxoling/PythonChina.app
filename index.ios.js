import React, {
  View,
  Text,
  NavigatorIOS,
  AppRegistry,
  createClass,
  StyleSheet
} from 'react-native'

import {Actions, Scene, Router} from 'react-native-router-flux'

import Timeline from './views/Timeline'
import Login from './components/Login'
import TabView from './components/TabView'
import TabIcon from './components/TabIcon'

let Home = createClass({
  render () {
    return (
      <NavigatorIOS style={{flex: 1}}
        initialRoute={{ title: 'Python China', component: Timeline }}
      />
    )
  },
})

// let Home = createClass({
//   render () {
//     return (
//       <Text>
//         hello
//       </Text>
//     )
//   },
// }) 
            // <Scene key="topic" title="话题" icon={TabIcon} navigationBarStyle={{backgroundColor: 'red'}} titleStyle={{color: 'white'}}

class App extends React.Component {
  render () {
    return (
      <Router>
        <Scene key="route">
          <Scene key="home" tabs={true} default="topic" style={{borderTopWidth: .5, borderColor: '#ccc', backgroundColor: '#fff', opacity: .95}}>
            <Scene key="topic"  title="话题" icon={ TabIcon } component={Timeline} navigationBarStyle={{backgroundColor:'#fff'}} titleStyle={{color:'white'}} initial={true} />
            <Scene key="discover" title="发现" icon={TabIcon} component={TabView} />
            <Scene key="me" title="我的" icon={TabIcon} component={TabView} />
          </Scene>
          <Scene key="login" component={Login} type="jump" title="登录"/>
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('PythonChina', () => App)
