import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActionSheetIOS,
} from 'react-native';
import { Button } from 'react-native-vector-icons/FontAwesome';

import HTMLNode from '../components/HTMLNode';
import { DEFAULT_AVATAR } from '../config';

const styles = StyleSheet.create({
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
    flex: 1,
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
    height: 50,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 10,
  },
});

export default class TopicContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: {},
      topicGot: false,
    };
    this.share = this.share.bind(this);
  }
  componentDidMount() {
    this.fetchTopic();
  }
  getShareData() {
    return {
      url: `https://python-china.org/t/${this.props.topicId}`,
      title: this.state.topic.title,
      summary: this.state.topic.content,
      imageUrl: 'https://python-china.org/apple-touch-icon-120.png',
    };
  }
  share() {
    const data = this.getShareData();
    ActionSheetIOS.showShareActionSheetWithOptions(
      {
        message: data.title,
        url: data.url,
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToVimeo',
          'com.apple.UIKit.activity.PostToFlickr',
        ],
      },
      (error) => alert(error),
      (success) => {
        console.log('shared: ', data.url, success);
      }
    );
  }

  fetchTopic() {
    const url = `https://python-china.org/api/topics/${this.props.topicId}`;
    fetch(url)
    .then((rsp) => rsp.json())
    .then((rspData) => {
      this.setState({
        topic: rspData,
        topicGot: true,
      });
    })
    .done();
  }

  render() {
    if (!this.state.topicGot) {
      return <View><Text>Loading...</Text></View>;
    }
    const topic = this.state.topic;
    const user = topic.user;
    const img = user.avatar_url && { uri: `https:${user.avatar_url}` } || DEFAULT_AVATAR;

    return (
      <View style={styles.topicContainer}>
        <View style={styles.container}>
          <Image
            source={img}
            style={styles.avatar}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{topic.title}</Text>
          </View>
        </View>
        <HTMLNode content={topic.content} />
        <View style={styles.bottomContainer}>
          <Text style={styles.name}>{user.name || user.username}</Text>
          <Text style={styles.bottom}>{topic.view_count} views</Text>
          <Text style={styles.bottom}>{topic.comment_count} replies</Text>
          <Text style={styles.bottom}>{topic.like_count} likes</Text>
          <Text style={styles.bottom}>{topic.created_at}</Text>
        </View>
        <Button
          name="share-alt"
          onPress={this.share}
        >
          <Text ref="share" style={{ color: '#ddd' }}>Share</Text>
        </Button>
      </View>
    );
  }
}

TopicContent.propTypes = {
  topicId: React.PropTypes.number,
};
