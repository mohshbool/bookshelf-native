const initialState = {
  title: '',
  author: '',
  imageUrl: '',
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