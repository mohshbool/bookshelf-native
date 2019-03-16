import { getBooks } from '../api/firebase'

export const getListingsActionCreator = q => dispatch => {
  dispatch({type: 'GET_LISTINGS_SENT'})
  return new Promise((resolve, reject) => {
    getBooks(q).then(listings => {
      dispatch({type:'GET_LISTINGS_FULFILLED', payload: {listings} })
      console.log(listings)
      resolve()
    }).catch(error => {
      dispatch({type:'GET_LISTINGS_REJECTED', payload: {error} })
      reject()
    })
  })
}

export const updateSearchInputActionCreator = q => ({
  type: 'UPDATE_SEARCH_INPUT',
  payload: q
})

export const updateListingActionCreator = listing => ({
  type: 'UPDATE_LISTING',
  payload: listing
})