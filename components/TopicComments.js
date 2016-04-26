import React, {
  Component,
  Text,
  View,
} from 'react-native';

import Comment from '../components/Comment';

export default class TopicComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      commentsGot: false,
    };
  }
  componentDidMount() {
    this.fetchComments();
  }
  fetchComments() {
    const url = `https://python-china.org/api/topics/${this.props.topicId}/comments?order=asc`;
    fetch(url)
    .then((rsp) => rsp.json())
    .then((rspData) => {
      this.setState({
        comments: rspData.data,
        commentsGot: true,
      });
    })
    .done();
  }

  render() {
    if (!this.state.commentsGot) {
      return <View><Text>Loading...</Text></View>;
    }
    let comments = [];
    this.state.comments.forEach((c) => {
      comments.push(<Comment key={c.id} comment={c} />);
    });
    return <View>{comments}</View>;
  }
}

TopicComments.propTypes = {
  topicId: React.PropTypes.number,
};
