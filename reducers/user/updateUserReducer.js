const initialState = {
  uid: '',
  username: '',
  email: '',
  phoneNumber: '',
  photoURL: '',
  isEmailVerified: false,
  isPhoneVerified: false,
}

const updateUserReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_USER':
      return {...state, ...action.payload}
    default: 
      return state
  }
}

export default updateUserReducer