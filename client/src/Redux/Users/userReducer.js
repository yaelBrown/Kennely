let initialState = {}

const UserReducer = ( state = initialState, action) => {
  console.log(action)

  switch (action.type) {
    case "USER_TO_STORE":
      return action.payload 
    default: return state
  }
}

export default UserReducer