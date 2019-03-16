import { combineReducers } from 'redux'

import updateFormReducer from './updateFormReducer'
import updateFormValidityReducer  from './updateFormValidityReducer'
import updateOverlayVisibilityReducer from './updateOverlayVisibilityReducer'
import updateSuggestionReducer from './updateSuggestionReducer'
import addBookReducer from './addBookReducer'
import uploadImageReducer from './uploadImageReducer'

export default combineReducers({
  updateForm: updateFormReducer,
  updateFormValidity: updateFormValidityReducer,
  updateOverlayVisibility: updateOverlayVisibilityReducer,
  updateSuggestion: updateSuggestionReducer,
  addBook: addBookReducer,
  uploadImage: uploadImageReducer,
})