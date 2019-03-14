const uploadImageReducer = (state = '', action) => {
  switch(action.type) {
    case 'UPLOAD_IMAGE_SENT':
      return 'UPLOAD_IMAGE_SENT'
    case 'UPLOAD_IMAGE_FULFILLED':
      return 'UPLOAD_IMAGE_FULFILLED'
    case 'UPLOAD_IMAGE_RERJECTED':
      return action.payload
    default:
      return state
  }
}

export default uploadImageReducer