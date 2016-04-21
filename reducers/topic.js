import types from '../actions/actionTypes';

const initialState = {
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_TOPIC:

      const url = `https://python-china.org/api/topics/${this.state.topicId}`;
      fetch(url)
      .then((rsp) => rsp.json())
      .then((rspData) => {
        state = {
          ...state,
          topic: rspData,
          topicGot: true,
        };
      })
      .done();
      return state;
    case types.FETCH_COMMENTS:
      return state;
    default:
      return state;
  }
}
