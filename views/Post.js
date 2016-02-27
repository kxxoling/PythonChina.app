'use strict';
import React, {
  createClass,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
} from 'react-native';

import { POST_URL, COMMENTS_URL, DEFAULT_AVATAR } from '../config'

var Post = createClass({
  getInitialState () {
    return {
      comments: new ListView.DataSource({
        rowHasChanged (row1, row2) {return row1 !== row2}
      }),
      post: {},
      postGot: false,
      commentsGot: false,
    }
  },
  render () {
    return (
      <View style={styles.mainContainer}>
        {this.renderPost(this.state.post)}
        {this.renderComments()}
      </View>
    );
  },
  componentDidMount () {
    this.fetchPost();
    this.fetchComments();
  },
  renderLoadingView () {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    )
  },
  renderPost (post) {
    if (!this.state.postGot) {
      return this.renderLoadingView();
    }
    return (
      <View style={styles.postContainer}>
        <View style={styles.container}>
          <Image
              source={post.user.avatar_url && {uri: 'https:'+post.user.avatar_url} || DEFAULT_AVATAR}
              style={styles.avatar}></Image>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{post.title}</Text>
          </View>
        </View>
        <View><Text>{post.content}</Text></View>
        <View style={styles.bottomContainer}>
          <Text style={styles.name}>{post.user.name || post.user.username}</Text>
          <Text style={styles.bottom}>{post.view_count} views</Text>
          <Text style={styles.bottom}>{post.comment_count} replies</Text>
          <Text style={styles.bottom}>{post.like_count} likes</Text>
          <Text style={styles.bottom}>{post.created_at}</Text>
        </View>
      </View>
    )
  },
  renderComments () {
    if (!this.state.commentsGot) {
      return this.renderLoadingView();
    }
    return (
      <ListView style={styles.listView}
        dataSource={this.state.comments}
        renderRow={(data) => this.renderComment(data)} />
    )
  },
  renderComment (comment) {
    return (
      <View style={styles.container}>
        <Image style={styles.avatar}
            source={comment.user.avatar_url && {uri: 'https:' + comment.user.avatar_url} || DEFAULT_AVATAR}
          />
        <View style={styles.rightContainer}>
          <View style={styles.rightHeader}>
            <Text>{comment.user.name || comment.user.username }</Text>
          </View>
          <Text style={styles.content}>{comment.content}</Text>
        </View>
      </View>
    )
  },
  fetchPost () {
    fetch(POST_URL)
      .then((rsp) => rsp.json())
      .then((rspData) => {
        this.setState({
          post: rspData,
          postGot: true
        });
      })
      .done();
  },
  fetchComments () {
    fetch(COMMENTS_URL)
      .then((rsp) => rsp.json())
      .then((rspData) => {
        this.setState({
          comments: this.state.comments.cloneWithRows(rspData.data),
          commentsGot: true
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
  postContainer: {
    marginTop: 16,
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
    flex: 1,
    paddingTop: 30,
  }
});

export default Post;