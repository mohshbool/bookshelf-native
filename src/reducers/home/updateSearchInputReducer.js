const updateSearchInputReducer = (state = '', action) => {
  switch(action.type) {
    case 'UPDATE_SEARCH_INPUT':
      return action.payload
    default:
      return state
  }
}

export default updateSearchInputReducer