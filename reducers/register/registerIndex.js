import { combineReducers } from 'redux'

import registerUserReducer  from './registerUserReducer'
import updateFormReducer from './updateFormReducer'
import validateFormReducer from './validateFormReducer'

export default combineReducers({
  updateForm: updateFormReducer,
  validateForm: validateFormReducer,
  registerUser: registerUserReducer,
})
