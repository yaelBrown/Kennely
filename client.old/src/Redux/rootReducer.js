import { combineReducers } from 'redux'

import feedReducer from './Feed/feedReducer.js'
import userReducer from './Users/userReducer.js'

const rootReducer = combineReducers({
  feed: feedReducer,
  user: userReducer
})

export default rootReducer
