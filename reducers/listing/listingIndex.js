import { combineReducers } from 'redux'

import getUserReducer from './getUserReducer'
import updateOverlayVisibilityReducer from './updateOverlayVisibilityReducer'

export default combineReducers({
  getUser: getUserReducer,
  updateOverlayVisibility: updateOverlayVisibilityReducer,
})