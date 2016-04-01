'use strict';
import React, {
  createClass,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  TextInput
} from 'react-native';

import { LOGIN_URL } from '../config'

var Login = createClass({
  getInitialState () {
    return {
      username: 'kxxoling@gmail.com',
      password: '1qaz2wsx'
    }
  },
  login () {
    fetch(LOGIN_URL, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${this.state.username}:${this.state.password}`)
      },
      body: JSON.stringify({permanent:true})
    })
    .then((json) => {
      console.log(json)
    })
  },
  render () {
    return (
      <View style={{marginTop: 80}}>
        <TextInput
            style={styles.input}
            onChangeText={(username) => this.setState({username: username})}
            value={this.state.username}
          />
        <TextInput
            style={styles.input}
            onChangeText={(password) => this.setState({password: password})}
            value={this.state.password}
          />
        <TouchableHighlight onDelayColor='#dddddd'
            onPress={this.login}>
          <Text>登录</Text>
        </TouchableHighlight>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginTop: 16
  }
})

export default Login;
