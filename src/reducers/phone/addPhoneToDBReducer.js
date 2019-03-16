const addPhoneToDBReducer = (state = '', action) => {
  switch(action.type) {
    case 'ADD_PHONE_TO_DB_SENT':
      return 'ADD_PHONE_TO_DB_SENT'
    case 'ADD_PHONE_TO_DB_FULFILLED':
      return 'ADD_PHONE_TO_DB_FULFILLED'
    case 'ADD_PHONE_TO_DB_REJECTED':
      return action.payload
    default: 
      return state
  }
}

export default addPhoneToDBReducer