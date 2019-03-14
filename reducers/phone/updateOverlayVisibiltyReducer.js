const updateOverlayVisibiltyReducer = (state = false, action) => {
  switch(action.type) {
    case 'UPDATE_PHONE_OVERLAY_VISIBILITY':
      return action.payload
    default:
      return state
  }
}

export default updateOverlayVisibiltyReducer