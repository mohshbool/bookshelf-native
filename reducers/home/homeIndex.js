import { combineReducers } from 'redux'

import getListingsReducer from './getListingsReducer'
import updateSearchInputReducer from './updateSearchInputReducer'
import updateListingReducer from './updateListingReducer'

export default combineReducers({
  getListings: getListingsReducer,
  updateSearch: updateSearchInputReducer,
  updateListing: updateListingReducer,
})