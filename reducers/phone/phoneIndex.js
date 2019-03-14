import { combineReducers } from 'redux'

import updateFormReducer from './updateFormReducer'
import updateOverlayVisibiltyReducer from './updateOverlayVisibiltyReducer'
import sendVerificationCodeReducer from './sendVerificationCodeReducer'
import confirmVerificationCodeReducer from './confirmVerificationCodeReducer'
import addPhoneToDBReducer from './addPhoneToDBReducer'

export default combineReducers({
  updateForm: updateFormReducer,
  updateOverlayVisibilty: updateOverlayVisibiltyReducer,
  sendVerificationCode: sendVerificationCodeReducer,
  confirmVerificationCode: confirmVerificationCodeReducer,
  addPhoneToDB: addPhoneToDBReducer,
})