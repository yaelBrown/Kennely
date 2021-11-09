let initialState = {} 

const FeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIAL_FEED_DISPLAY": 
      if (action.payload.length > 0) {
        return { 
          ...state, 
          posts: action.payload, 
          earliestPostDate: action.payload[0].date
        }
      } else {
        return state
      }
    case "UPDATE_FEED":
      if (action.payload.posts.length > 0) {
        let newState = {...state}
        newState.posts = newState.posts.concat(action.payload.posts)
        return newState
      } else {
        return state
      }
    default: return state
  }
}

export default FeedReducer