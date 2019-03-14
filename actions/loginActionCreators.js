import { loginUser } from '../api/firebase'

export const loginUserActionCreator = user => dispatch =>  {
  dispatch({type: 'LOGIN_USER'})
  return new Promise ((resolve, reject) => {
    loginUser(user).then(
      () => {
        dispatch({type: 'LOGIN_FULFILLED'})
        resolve()
      },
      error => {
        dispatch({type: 'LOGIN_REJECTED', payload: error})
        reject()
      }
    )
  })
}

export const updateFormActionCreator = form => ({
  type: 'UPDATE_LOGIN_FORM',
  payload: form
})

export const clearFormActionCreator = () => ({
  type: 'CLEAR_LOGIN_FORM',
})

export const validateFormActionCreator = isValid => ({
  type: 'UPDATE_LOGIN_VALIDITY',
  payload: isValid,
})