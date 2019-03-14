const initialState = {
  username: {
    value: '', color: '#000', err: ' ',
  },
  email: {
    value: '', color: '#000', err: ' ',
  },
  password: {
    value: '', color: '#000', err: ' ',
  },
  phone: {
    value: '', color: '#000', err: ' ',
  },
}

const updateFormReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_REGISTER_FORM':
      return {...state , ...action.payload}
    case 'CLEAR_REGISTER_FORM':
      return initialState
    default:
      return state
  }
}

export default updateFormReducer