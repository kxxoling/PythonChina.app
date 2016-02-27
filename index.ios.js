'use strict';
import React, {
  AppRegistry,
  createClass,
  StyleSheet,
  Text,
  ListView,
  View,
  Image
} from 'react-native';

const DATA_URL = 'https://python-china.org/api/topics/timeline?show=all';
const DEFAULT_AVATAR = require('./assets/python.png')

var PythonChina = createClass ({
  getInitialState () {
    return {
      data: new ListView.DataSource({
        rowHasChanged (row1, row2) {return row1 !== row2}
      }),
      cursor: null
    }
  },
  render () {
    if (!this.state.cursor) {
      return this.renderLoadingView();
    }
    return (
      <ListView style={styles.listView}
          dataSource={this.state.data}
          renderRow={this.renderPost}>
      </ListView>
    );
  },
  componentDidMount () {
    this.fetchData();
  },
  renderLoadingView () {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading ....</Text>
      </View>
    )
  },
  renderPost (post) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Image
              source={post.user.avatar_url && {uri: 'https:'+post.user.avatar_url} || DEFAULT_AVATAR}
              style={styles.avatar}></Image>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{post.title}</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.name}>{post.user.name || post.user.username}</Text>
          <Text style={styles.bottom}>{post.view_count} views</Text>
          <Text style={styles.bottom}>{post.read_count} replies</Text>
          <Text style={styles.bottom}>{post.like_count} likes</Text>
          <Text style={styles.bottom}>{post.created_at}</Text>
        </View>
      </View>
    )
  },
  fetchData () {
    fetch(DATA_URL)
      .then((rsp) => rsp.json())
      .then((rspData) => {
        this.setState({
          data: this.state.data.cloneWithRows(rspData.data),
          cursor: true
        });
      })
      .done();
  }
})

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    fontSize: 36
  },
  mainContainer: {
    flex: 1,
    margin: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  rightContainer: {
    flex: 1
  },
  bottomContainer: {
    flex: 1,
    marginBottom: 12,
    flexDirection: 'row',
  },
  bottom: {
    color: '#777',
    fontSize: 14,
    marginRight: 4,
  },
  name: {
    color: '#555',
    fontSize: 14,
    marginRight: 4,
  },
  avatar: {
    width: 50,
    height: 50
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 10,
  },
  listView: {
    backgroundColor: '#f5fdfd',
    paddingTop: 30,
  }
});

AppRegistry.registerComponent('PythonChina', () => PythonChina);
