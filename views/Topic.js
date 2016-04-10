import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ScrollView,
  ActionSheetIOS,
} from 'react-native';
import { Button } from 'react-native-vector-icons/FontAwesome';

import HTMLNode from '../components/HTMLNode';

import { DEFAULT_AVATAR } from '../config';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    fontSize: 36,
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
  listView: {
    flex: 1,
    paddingTop: 30,
  },
});

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: new ListView.DataSource({
        rowHasChanged(row1, row2) { return row1 !== row2; },
      }),
      topic: {},
      topicGot: false,
      commentsGot: false,
      topicId: this.props.topicId,
    };
    this._share = this._share.bind(this);
  }
  componentDidMount() {
    this.fetchTopic();
    this.fetchComments();
  }
  getShareData() {
    return {
      url: `https://python-china.org/t/${this.state.topicId}`,
      title: this.state.topic.title,
      summary: this.state.topic.content,
      imageUrl: 'https://python-china.org/apple-touch-icon-120.png',
    };
  }
  _share() {
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
    const url = `https://python-china.org/api/topics/${this.state.topicId}`;
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
  fetchComments() {
    const url = `https://python-china.org/api/topics/${this.state.topicId}/comments?order=asc`;
    fetch(url)
      .then((rsp) => rsp.json())
      .then((rspData) => {
        this.setState({
          comments: this.state.comments.cloneWithRows(rspData.data),
          commentsGot: true,
        });
      })
      .done();
  }
  renderLoadingView(string) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading {string}...</Text>
      </View>
    );
  }
  renderTopic(topic) {
    if (!this.state.topicGot) {
      return this.renderLoadingView('topic');
    }
    let img = topic.user.avatar_url && { uri: `https:${topic.user.avatar_url}` } || DEFAULT_AVATAR;
    return (
      <View style={styles.topicContainer}>
        <View style={styles.container}>
          <Image source={img}
            style={styles.avatar}
          />
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
        <Button
          name="share-alt"
          onPress={this._share}
        >
          <Text ref="share" style={{ color: '#ddd' }}>Share</Text>
        </Button>
      </View>
    );
  }
  renderComments() {
    if (!this.state.commentsGot) {
      return this.renderLoadingView('comments');
    }
    return (
      <ListView style={styles.listView}
        dataSource={this.state.comments}
        renderRow={(data) => this.renderComment(data)}
      />
    );
  }
  renderComment(comment) {
    const avatar = comment.user.avatar_url
        && { uri: `https:${comment.user.avatar_url}` } || DEFAULT_AVATAR;
    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={avatar} />
        <View style={styles.rightContainer}>
          <View style={styles.rightHeader}>
            <Text>{comment.user.name || comment.user.username }</Text>
          </View>
          <HTMLNode content={comment.content} />
        </View>
      </View>
    );
  }
  render() {
    return (
      <ScrollView style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
      >
        {this.renderTopic(this.state.topic)}
        {this.renderComments()}
      </ScrollView>
    );
  }
}

Topic.propTypes = {
  topicId: React.PropTypes.number,
};

export default Topic;
