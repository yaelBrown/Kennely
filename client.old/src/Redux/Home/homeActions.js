import { USER_TO_STORE } from './homeTypes.js'

export const addUserToStore = (user) => {
  return {
    type: USER_TO_STORE,
    payload: user
  }
}