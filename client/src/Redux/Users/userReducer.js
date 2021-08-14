let initialState = {
  loggedInUser: null
}

const UserReducer = ( state = initialState, action) => {
  switch (action.type) {
    case "USER_TO_STORE":
      return { 
        ...state,
        loggedInUser: action.payload
      }
    default: return state
  }
}

export default UserReducer