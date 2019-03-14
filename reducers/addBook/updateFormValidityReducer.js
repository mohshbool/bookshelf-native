const updateFormValidityReducer = (state = false, action) => {
  switch(action.type) {
    case 'UPDATE_ADD_BOOK_FORM_VALIDITY':
      return action.payload
    default:
      return state
  }
}

export default updateFormValidityReducer