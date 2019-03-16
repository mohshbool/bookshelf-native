const validateFormReducer = (state = false, action) => {
  switch(action.type) {
    case 'UPDATE_REGISTER_VALIDITY':
      return action.payload
    default:
      return state
  }
}

export default validateFormReducer