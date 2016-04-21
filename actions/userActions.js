import types from './actionTypes';

export default {
  login() {
    return {
      type: types.LOGIN,
    };
  },
  logout() {
    return {
      type: types.LOGOUT,
    };
  },
  fetchProfile() {
    return {
      type: types.FETCH_PROFILE,
    };
  },
  fetchMyTopics() {
    return {
      type: types.FETCH_MY_TOPICS,
    };
  },
};

