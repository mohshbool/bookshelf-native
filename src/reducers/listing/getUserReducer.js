const initialState = {
  user: {
    username: '',
    email: '',
    phoneNumber: '',
  },
  error: '',
}

const getUserReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_USER_SENT':
      return state
    case 'GET_USER_FULFILLED':
    case 'GET_USER_REJECTED':
      return action.payload
    default:
      return state
  }
}

export default getUserReducer