import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';

import TopicContent from '../components/TopicContent';
import TopicComments from '../components/TopicComments';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 8,
  },
});

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicId: this.props.topicId,
    };
  }
  render() {
    return (
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
      >
        <TopicContent topicId={this.state.topicId} />
        <TopicComments topicId={this.state.topicId} />
      </ScrollView>
    );
  }
}

Topic.propTypes = {
  topicId: React.PropTypes.number,
};

export default Topic;
