'use strict';
import React, {
  AppRegistry,
  createClass,
  StyleSheet,
  Text,
  ListView,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';

import { TIMELINE_URL, DEFAULT_AVATAR } from '../config'
import Post from './Post'

var Timeline = createClass({
  getInitialState () {
    return {
      isRefreshing: false,
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
      <ScrollView showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          refreshControl={
            <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._fetchNewData}
                tintColor="#ff0000"
                title="Loading..."
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffff00"
              />
          }>
        <ListView style={styles.listView}
            dataSource={this.state.data}
            renderRow={this.renderPost}>
        </ListView>
      </ScrollView>
    );
  },
  componentDidMount () {
    this._fetchData();
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
      <TouchableHighlight onDelayColor='#dddddd'
          onPress={() => this.jumpToPost(post.id)}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Image style={styles.avatar}
              source={post.user.avatar_url
                  && {uri: 'https:'+post.user.avatar_url}
                  || DEFAULT_AVATAR} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{post.title}</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.name}>{post.user.name || post.user.username}</Text>
          <Text style={styles.bottom}>{post.view_count} views</Text>
          <Text style={styles.bottom}>{post.comment_count} replies</Text>
          <Text style={styles.bottom}>{post.like_count} likes</Text>
          <Text style={styles.bottom}>{post.created_at}</Text>
        </View>
      </View>
      </TouchableHighlight>
    )
  },
  _fetchData () {
    return fetch(TIMELINE_URL)
      .then(rsp => rsp.json())
      .then(data => this._handelRsp(data))
      .catch(
        error =>
          this.setState({
            isLoading: false,
            message: 'Something bad happened ' + error
          })
      );
  },
  _fetchNewData () {
    this.setState({isRefreshing: true});
    this._fetchData()
      .then(() => {
        this.setState({
          isRefreshing: false
        });
      });
  },
  _handelRsp (rsp) {
    console.log(rsp)
    this.setState({
      data: this.state.data.cloneWithRows(rsp.data),
      cursor: true
    });
  },
  jumpToPost (id) {
    this.props.navigator.push({
      name: 'Post page',
      component: Post,
      passProps: {
        postId: id
      }
    });
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
    marginTop: 50,
  }
});

export default Timeline;