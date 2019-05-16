const INITIAL_STATE = [{
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
}]

const getMyListingsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'GET_MY_LISTINGS_SENT':
      return state
    case 'GET_MY_LISTINGS_FULFILLED':
      return action.payload.listings || state
    case 'GET_MY_LISTINGS_REJECTED':
      return action.payload.error || state
    default:
      return state
  }
}

export default getMyListingsReducer