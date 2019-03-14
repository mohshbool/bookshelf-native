import { combineReducers } from 'redux'

import updateUserReducer from './updateUserReducer'

export default combineReducers({
  updateUser: updateUserReducer,
})