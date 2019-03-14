import { registerUser } from '../api/firebase'

export const registerUserActionCreator = userInfo => dispatch => {
  dispatch({type: 'REGISTER_SENT'})
  return new Promise((resolve, reject) => {
    registerUser(userInfo).then(
      () => {
        dispatch({type: 'REGISTER_FULFILLED'})
        resolve()
      },
      error => {
        dispatch({type: 'REGISTER_REJECTED', payload: error})
        reject()
      })
    }
  )
}

export const updateFormActionCreator = user => ({
  type: 'UPDATE_REGISTER_FORM',
  payload: user,
})

export const clearFormActionCreator = () => ({
  type: 'CLEAR_REGISTER_FORM'
})

export const validateFormActionCreator = isValid => ({
  type: 'UPDATE_REGISTER_VALIDITY',
  payload: isValid,
})