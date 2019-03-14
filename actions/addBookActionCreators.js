import { getBooks } from '../util'
import { addBook, uploadImage } from '../api/firebase'

export const getBooksActionCreator = q => dispatch => {
  dispatch({type: 'GET_BOOKS_SENT'})
  return new Promise((resolve, reject) => {
    getBooks(q).then(books => {
      dispatch({type: 'GET_BOOKS_FULFILLED'})
      resolve(books)
    }).catch(() => {
      dispatch({type: 'GET_BOOKS_RERJECTED'})
      reject()
    })
  })
}

export const addBookActionCreator = form => dispatch => {
  dispatch({type: 'ADD_BOOK_SENT'})
  return new Promise((resolve, reject) => {
    addBook(form).then(postId => {
      dispatch({type: 'ADD_BOOK_FULFILLED'})
      resolve(postId)
    }).catch(() => {
      dispatch({type: 'ADD_BOOK_RERJECTED'})
      reject()
    })
  })
}

export const uploadImageActionCreator = (imageUri, postId) => dispatch => {
  dispatch({type: 'UPLOAD_IMAGE_SENT'})
  return new Promise((resolve, reject) => {
    uploadImage(imageUri, postId).then(() => {
      dispatch({type: 'UPLOAD_IMAGE_FULFILLED'})
      resolve()
    }).catch(error => {
      dispatch({type: 'UPLOAD_IMAGE_REJECTED', payload: error})
      reject(error)
    })
  })
}

export const updateFormActionCreator = form => ({
  type: 'UPDATE_ADD_BOOK_FORM',
  payload: form
})

export const updateOverlayVisibilityActionCreator = visible => ({
  type: 'UPDATE_ADD_BOOK_OVERLAY_VISIBILITY',
  payload: visible
})

export const updateFormValidityActionCreator = valid => ({
  type: 'UPDATE_ADD_BOOK_FORM_VALIDITY',
  payload: valid
})

export const clearFormActionCreator = () => ({
  type: 'CLEAR_ADD_BOOK_FORM'
})

export const updateSuggestionActionCreator = suggestion => ({
  type: 'UPDATE_SUGGESTION',
  payload: suggestion,
})