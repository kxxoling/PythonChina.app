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
  ActionSheetIOS,
} from 'react-native';
import HTMLNode from '../components/HTMLNode'

import { DEFAULT_AVATAR } from '../config'

var Topic = createClass({
  getInitialState () {
    return {
      comments: new ListView.DataSource({
        rowHasChanged (row1, row2) {return row1 !== row2}
      }),
      topic: {},
      topicGot: false,
      commentsGot: false,
      topicId: this.props.topicId,
    }
  },
  getShareData () {
    return {
      url: `https://python-china.org/t/${this.state.topicId}`,
      title: this.state.topic.title,
      summary: this.state.topic.content,
      imageUrl: 'https://python-china.org/apple-touch-icon-120.png',
    }
  },
  render () {
    return (
      <ScrollView style={styles.mainContainer}
          showsVerticalScrollIndicator={false}>
        {this.renderTopic(this.state.topic)}
        {this.renderComments()}
      </ScrollView>
    );
  },
  componentDidMount () {
    this.fetchTopic();
    this.fetchComments();
  },
  renderLoadingView (string) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading {string}...</Text>
      </View>
    )
  },
  renderTopic (topic) {
    if (!this.state.topicGot) {
      return this.renderLoadingView('topic');
    }
    return (
      <View style={styles.topicContainer}>
        <View style={styles.container}>
          <Image
              source={topic.user.avatar_url && {uri: 'https:' + topic.user.avatar_url} || DEFAULT_AVATAR}
              style={styles.avatar}></Image>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{topic.title}</Text>
          </View>
        </View>
        <HTMLNode content={topic.content} />
        <View style={styles.bottomContainer}>
          <Text style={styles.name}>{topic.user.name || topic.user.username}</Text>
          <Text style={styles.bottom}>{topic.view_count} views</Text>
          <Text style={styles.bottom}>{topic.comment_count} replies</Text>
          <Text style={styles.bottom}>{topic.like_count} likes</Text>
          <Text style={styles.bottom}>{topic.created_at}</Text>
        </View>
        <TouchableHighlight
            onPress={this._share} >
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
  fetchTopic () {
    var url = `https://python-china.org/api/topics/${this.state.topicId}`;
    fetch(url)
      .then((rsp) => rsp.json())
      .then((rspData) => {
        this.setState({
          topic: rspData,
          topicGot: true
        });
      })
      .done();
  },
  fetchComments () {
    var url = `https://python-china.org/api/topics/${this.state.topicId}/comments?order=asc`
    fetch(url)
      .then((rsp) => rsp.json())
      .then((rspData) => {
        this.setState({
          comments: this.state.comments.cloneWithRows(rspData.data),
          commentsGot: true
        });
      })
      .done();
  },
  _share () {
    var data = this.getShareData()
    ActionSheetIOS.showShareActionSheetWithOptions({
      message: data.title,
      url: data.url,
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToVimeo',
        'com.apple.UIKit.activity.PostToFlickr'
      ]
    },
    (error) => alert(error),
    (success, method) => {
      console.log('shared: ', data.url, success)
    })
  },
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
  topicContainer: {
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

export default Topic;

