import types from './actionTypes';

export default {
  fetchTimeline() {
    return {
      type: types.FETCH_TIMELINE,
    };
  },
  fetchAll() {
    return {
      type: types.FETCH_ALL,
    };
  },
};

