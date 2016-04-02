const BASE_URL = 'https://python-china.org/api'

export const DEFAULT_AVATAR = require('./assets/python.png')
export const HOME_URL = `${BASE_URL}/topics/timeline`
export const TIMELINE_URL = `${HOME_URL}?show=all`
export const LOGIN_URL = `${BASE_URL}/session`
export const SELF_PROFILE = `${BASE_URL}/users/me`
export const NOTIFICATION = `${SELF_PROFILE}/notification`

export function getProfileUrl (username) {
  return `${BASE_URL}/api/users/${username}`
}
