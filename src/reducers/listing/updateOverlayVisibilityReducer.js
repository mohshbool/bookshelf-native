const updateOverlayVisibilityReducer = (state = false, action) => {
  switch(action.type) {
    case 'UPDATE_LISTING_OVERLAY_VISIBILITY':
      return action.payload
    default:
      return state
  }
}

export default updateOverlayVisibilityReducer