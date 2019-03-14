const updateOverlayVisibilityReducer = (state = false, action) => {
  switch(action.type) {
    case 'UPDATE_ADD_BOOK_OVERLAY_VISIBILITY':
      return action.payload
    default:
      return state
  }
}

export default updateOverlayVisibilityReducer