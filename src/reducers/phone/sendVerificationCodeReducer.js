const initialState = {
  id: null,
  error: '',
}

const sendVerificationCodeReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SEND_CODE_SENT':
      return 'CODE_SENT'
    case 'SEND_CODE_FULFILLED':
      return {id: action.payload, error: ''}
    case 'SEND_REJECTED':
    return {id: '', error: action.payload}
    default:
      return state
  }
}

export default sendVerificationCodeReducer