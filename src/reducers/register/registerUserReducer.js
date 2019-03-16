const registerUserReducer = (state = '', action) => {
  switch(action.type) {
    case 'REGISTER_SENT':
      return 'REGISTER_SENT'
    case 'REGISTER_FULFILLED':
      return 'REGISTER_FULFILLED'
    case 'REGISTER_REJECTED':
      return action.payload
    default:
      return state
  }
}

export default registerUserReducer