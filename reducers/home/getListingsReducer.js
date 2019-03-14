const initialState = { listing: {
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
  id: '',
  GRimageUrl: '',
}}

const getListingsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_LISTINGS_SENT':
      return state
    case 'GET_LISTINGS_FULFILLED':
      return action.payload.listings || state
    case 'GET_LISTINGS_REJECTED':
      return action.payload.error || state
    default:
      return state
  }
}

export default getListingsReducer