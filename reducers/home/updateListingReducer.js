const initialState = {
  id: '',
  uid: '',
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

const updateListingReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_LISTING':
      return action.payload
    default:
      return state
  }
}

export default updateListingReducer