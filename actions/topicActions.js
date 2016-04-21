import types from './actionTypes';

export default {
  fetchTopic() {
    return {
      type: types.FETCH_TOPIC,
    };
  },
  fetchComments() {
    return {
      type: types.FETCH_COMMENTS,
    };
  },
};

