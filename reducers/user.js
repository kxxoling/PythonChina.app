import types from '../actions/actionTypes';

const initialState = {
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN:
      return state;
    case 'LOGOUT':
      return state;
    default:
      return state;
  }
}
