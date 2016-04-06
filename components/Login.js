import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';

import { LOGIN_URL } from '../config';

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginTop: 16,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  login() {
    const hash = btoa(`${this.state.username}:${this.state.password}`);
    fetch(LOGIN_URL, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Basic ${hash}`,
      },
      body: JSON.stringify({ permanent: true }),
    })
    .then((json) => {
      console.log(json);
    });
  }
  render() {
    return (
      <View style={{ marginTop: 80 }}>
        <TextInput
          style={styles.input}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
        />
        <TextInput
          style={styles.input}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableHighlight onDelayColor="#dddddd"
          onPress={this.login}
        >
          <Text>登录</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Login;
