const initialState = {
  phoneNumber: '',
  userCode: ''
}

const updateFromReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_PHONE_FORM':
      return {...state, ...action.payload}
    default:
      return state
  }
}

export default updateFromReducer