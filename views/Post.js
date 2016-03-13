'use strict';
import React, {
  createClass,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import HTMLNode from '../components/HTMLNode'

import { DEFAULT_AVATAR } from '../config'
import ActivityView from 'react-native-activity-view';

var Post = createClass({
  getInitialState () {
    return {
      comments: new ListView.DataSource({
        rowHasChanged (row1, row2) {return row1 !== row2}
      }),
      post: {},
      postGot: false,
      commentsGot: false,
      postId: this.props.postId,
    }
  },
  getShareData () {
    return {
      url: `https://python-china.org/t/${this.state.postId}`,
      title: this.state.post.title,
      summary: this.state.post.content,
      imageUrl: 'https://python-china.org/apple-touch-icon-120.png',
    }
  },
  _pressHandler () {
    var data = this.getShareData()
    console.log(data);
    ActivityView.show({
      text: data.title,
      url: data.url,
      imageUrl: data.imageUrl,
    });
  },
  render () {
    return (
      <ScrollView style={styles.mainContainer}
          showsVerticalScrollIndicator={false}>
        {this.renderPost(this.state.post)}
        {this.renderComments()}
      </ScrollView>
    );
  },
  componentDidMount () {
    this.fetchPost();
    this.fetchComments();
  },
  renderLoadingView (string) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading {string}...</Text>
      </View>
    )
  },

  renderPost (post) {
    if (!this.state.postGot) {
      return this.renderLoadingView('post');
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
        <HTMLNode content={post.content} />
        <View style={styles.bottomContainer}>
          <Text style={styles.name}>{post.user.name || post.user.username}</Text>
          <Text style={styles.bottom}>{post.view_count} views</Text>
          <Text style={styles.bottom}>{post.comment_count} replies</Text>
          <Text style={styles.bottom}>{post.like_count} likes</Text>
          <Text style={styles.bottom}>{post.created_at}</Text>
        </View>
        <TouchableHighlight
            onPress={this._pressHandler} >
          <Text ref="share">Share</Text>
        </TouchableHighlight>
      </View>
    )
  },
  renderComments () {
    if (!this.state.commentsGot) {
      return this.renderLoadingView('comments');
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
          <HTMLNode content={comment.content} />
        </View>
      </View>
    )
  },
  fetchPost () {
    var url = `https://python-china.org/api/topics/${this.state.postId}`;
    fetch(url)
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
    var url = `https://python-china.org/api/topics/${this.state.postId}/comments?order=asc`
    fetch(url)
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

