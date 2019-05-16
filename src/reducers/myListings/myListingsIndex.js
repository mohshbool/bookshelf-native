import { combineReducers } from 'redux'

import getMyListingsReducer from './getMyListingsReducer'

export default combineReducers({
  getMyListings: getMyListingsReducer
})