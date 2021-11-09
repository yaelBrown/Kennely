import { USERS_FROM_CACHE, USER_TO_CACHE, USERS_TO_CACHE } from './userTypes.js'

export const getUsersFromCache = () => {
  return {
    type: USERS_FROM_CACHE
  }
}

export const addUserToCache = (user) => {
  return {
    type: USER_TO_CACHE,
    payload: user
  }
}

export const addUsersToCache = (users) => {
  return {
    type: USERS_TO_CACHE,
    payload: users
  }
}