import { combineReducers } from 'redux'

import user from './user/userIndex'
import register from './register/registerIndex'
import login from './login/loginIndex'
import phone from './phone/phoneIndex'
import addBook from './addBook/addBookIndex'
import home from './home/homeIndex'
import listing from './listing/listingIndex'

export default combineReducers({
  user: user,
  register: register,
  login: login,
  phone: phone,
  addBook: addBook,
  home: home,
  listing: listing,
})