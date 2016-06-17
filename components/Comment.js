import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

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
  rightContainer: {
    flex: 1,
    marginLeft: 10,
  },
  avatar: {
    width: 50,
    height: 50,
  },
});

export default class Comment extends Component {
  handleLike() {}

  render() {
    const comment = this.props.comment;
    const avatar = comment.user.avatar_url
        && { uri: `https:${comment.user.avatar_url}` } || DEFAULT_AVATAR;
    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={avatar} />
        <View style={styles.rightContainer}>
          <View style={styles.rightHeader}>
            <Text>{comment.user.name || comment.user.username}</Text>
          </View>
          <HTMLNode content={comment.content} />
        </View>
      </View>
    );
  }
}

Comment.propTypes = {
  comment: React.PropTypes.object,
};
