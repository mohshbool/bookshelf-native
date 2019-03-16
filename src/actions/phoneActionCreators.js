import { verifyPhoneNumber as VPN } from '../api/firebase'

export const updateFormActionCreator = form => ({
  type: 'UPDATE_PHONE_FORM',
  payload: form
})

export const sendVerificationCodeActionCreator = phoneNumber => dispatch => {
  dispatch({type: 'SEND_CODE_SENT'})
  return new Promise((resolve, reject) => {
    VPN.sendVerificationCode(phoneNumber).then(verifcationId => {
      dispatch({type: 'SEND_CODE_FULFILLED', payload: verifcationId})
      resolve()
    }).catch(error => {
      dispatch({type: 'SEND_CODE_REJECTED', payload: error})
      reject()
    })
  })
}

export const confirmVerificationCodeActionCreator = (verifcationId, userCode) => {
  return dispatch => {
    dispatch({type: 'CONFIRM_CODE_SENT'})
    return new Promise(resolve => {
      VPN.confirmVerificationCode(verifcationId, userCode).then(credintial => {
        dispatch({type: 'CONFIRM_CODE_FULFILLED'})
        resolve(credintial)
      })
    })
  }
}

export const addToDBActionCreator = credintial => dispatch => {
  dispatch({type: 'ADD_PHONE_TO_DB_SENT'})
  return new Promise((resolve, reject) => {
    VPN.addToDB(credintial).then(() => {
      dispatch({type: 'ADD_PHONE_TO_DB_FULFUILLED'})
      resolve()
    }).catch(error => {
      dispatch({type:'ADD_PHONE_TO_DB_REJECTED', payload: error})
      reject()
    })
  })
}

export const updateOverlayVisibiltyActionCreator = visibility => ({
  type: 'UPDATE_PHONE_OVERLAY_VISIBILITY',
  payload: visibility
})