const addBookReducer = (state = '', action) => {
  switch(action.type) {
    case 'ADD_BOOK_SENT':
      return 'ADD_BOOK_SENT'
    case 'ADD_BOOK_FULFILLED':
      return 'ADD_BOOK_FULFILLED'
    case 'ADD_BOOK_RERJECTED':
      return 'ADD_BOOK_RERJECTED'
    default:
      return state
  }
}

export default addBookReducer