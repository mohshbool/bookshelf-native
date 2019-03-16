const initialState = {
  email: '', 
  password: '',
}

const updateFormReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_LOGIN_FORM':
      return {...state, ...action.payload}
    case 'CLEAR_LOGIN_FORM':
      return initialState
    default:
      return state
  }
}

export default updateFormReducer