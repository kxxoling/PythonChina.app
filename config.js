'use strict';

const BASE_URL = 'https://python-china.org'

exports default {
  DEFAULT_AVATAR: require('./assets/python.png'),
  TIMELINE_URL: `${BASE_URL}`,
  HOME_URL: `${BASE_URL}/topics/timeline`,
  LOGIN_URL: `${BASE_URL}/session`,
  SELF_PROFILE: `${BASE_URL}/api/users/me`,
  NOTIFICATION: `${BASE_URL}/notification`,
  getProfileUrl (username) {
    return `${BASE_URL}/api/users/${username}`
  }
}
