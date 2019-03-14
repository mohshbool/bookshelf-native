import { getUser } from '../api/firebase'

export const getUserActionCreator = uid => dispatch => {
  dispatch({type: 'GET_USER_SENT'})
  return new Promise((resolve, reject) => {
    getUser(uid).then(user => {
      dispatch({type: 'GET_USER_FULFILLED', payload: {user} })
      resolve()
    }).catch(error => {
      dispatch({type: 'GET_USER_RERJECTED', payload: {error} })
      reject()
    })
  })
}

export const updateOverlayVisibilityActionCreator = visibility => ({
  type: 'UPDATE_LISTING_OVERLAY_VISIBILITY',
  payload: visibility
})