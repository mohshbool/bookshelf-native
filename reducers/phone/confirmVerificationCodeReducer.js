const confirmVerificationCodeReducer = (state = '', action) => {
  switch(action.type) {
    case 'CONFIRM_CODE_SENT':
      return 'CONFIRM_CODE_SENT'
    case 'CONFIRM_CODE_FULFILLED':
      return 'CONFIRM_CODE_FULFILLED'
    case 'CONFIRM_CODE_REJECTED':
      return action.payload
    default:
      return state
  }
}

export default confirmVerificationCodeReducer