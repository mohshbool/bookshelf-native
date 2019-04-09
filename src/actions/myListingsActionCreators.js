import { getMyBooks } from '../api/firebase'

export const getMyListingsActionCreator = () => dispatch => {
  dispatch({ type: 'GET_MY_LISTINGS_SENT' })
  getMyBooks().then(listings => {
    dispatch({
      type: 'GET_MY_LISTINGS_FULFILLED',
      payload: { listings }
    })
  }).catch(error =>  {
    dispatch({
      type: 'GET_MY_LISTINGS_REJECTED',
      payload: { error }
    })
  })
}