import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-vector-icons/FontAwesome';

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
    this.login = this.login.bind(this);
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
        <Button name="sign-in" backgroundColor="#42b983"
          onPress={this.login}
        >
          <Text
            style={{ color: '#ddd' }}
          >登录</Text>
        </Button>
      </View>
    );
  }
}

export default Login;
