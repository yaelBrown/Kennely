import * as actionTypes from './homeTypes.js'

const initialState = {
  user: {},
  friends: [],
  options: {},
  notifications: [],
  feed: []
}

const HomeReducer = ( state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_TO_STORE: 
      return {
        ...state,
        user: action.payload
      }
    default: return state
  }
}

export default HomeReducer