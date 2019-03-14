const loginUserReducer = (state = '', action) => {
  switch(action.type) {
    case 'LOGIN_SENT':
      return 'LOGIN_SENT'
    case 'LOGIN_FULFILLED':
      return 'LOGIN_FULFILLED'
    case 'LOGIN_REJECTED':
      return action.payload
    default:
      return state
  }
}

export default loginUserReducer