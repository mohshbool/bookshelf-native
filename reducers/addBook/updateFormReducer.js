const initialState = {
  title: '',
  author: '',
  location: {
    city: '',
    area: '',
    full: '',
  },
  type: '',
  price: '',
  descreption: '',
  imageUri: '',
  GRimageUrl: '',
}

const updateFormReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_ADD_BOOK_FORM':
      return {...state, ...action.payload}
    case 'CLEAR_ADD_BOOK_FORM':
      return initialState
    default:
      return state
  }
}

export default updateFormReducer