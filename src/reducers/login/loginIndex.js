import { combineReducers } from 'redux'

import loginUserReducer from './loginUserReducer'
import updateFormReducer from './updateFormReducer'
import validateFormReducer from './validateFormReducer'


export default combineReducers({
  updateForm: updateFormReducer,
  validateForm: validateFormReducer,
  loginUser: loginUserReducer,
})