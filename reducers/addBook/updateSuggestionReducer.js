const initialState = {
  id: '',
  title: '',
  author: {
    id: '',
    name: '',
  },
  imageUrl: '',
  smallImageUrl: '',
}

const updateSuggestionReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_SUGGESTION':
      return {...state, ...action.payload}
    default:
      return state
  }
}

export default updateSuggestionReducer