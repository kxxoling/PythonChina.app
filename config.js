'use strict';

const BASE_URL = 'https://python-china.org'

export const DEFAULT_AVATAR = require('./assets/python.png')
export const TIMELINE_URL = `${BASE_URL}/api/topics/timeline`
export const HOME_URL = `${BASE_URL}`
export const LOGIN_URL = `${BASE_URL}/session`
export const SELF_PROFILE = `${BASE_URL}/api/users/me`
export const NOTIFICATION = `${BASE_URL}/notification`

export default function (username) {
    return `${BASE_URL}/api/users/${username}`
}