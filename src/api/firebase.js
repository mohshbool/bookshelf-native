import { Platform } from 'react-native'
import firebase from 'react-native-firebase'

export const registerUser = userInfo => {
  const { username, email, password, phoneNumber } = userInfo
  return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(info => {
      if(info) {
        const user = info.user
        user.updateProfile({ displayName: username })
        let updates = {}
        updates['users/' + user.uid] = {
          uid: user.uid,
          username: username,
          email: email,
          phoneNumber: phoneNumber,
          isEmailVerified: false,
          isPhoneVerified: false,
        }
        firebase.database().ref().update(updates)
        resolve()
      }
    })
    .catch(err => {
      let error = null
      switch (err.code) {
        case 'auth/email-already-in-use':
          error = 'This email address is already taken'
          break
        case 'auth/invalid-email':
          error = 'Invalid e-mail address format'
          break
        case 'auth/weak-password':
          error = 'Password is too weak'
          break
        default:
          error = 'Check your internet connection'
      }
      reject(error || err.message)
    })
  })
}

export const loginUser = userInfo => {
  const { email, password } = userInfo
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => resolve(user) )
    .catch(err => {
      let error = null
      switch (err.code) {
        case 'auth/invalid-email':
          error = 'Invalid email address format.'
          break
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          error = 'Invalid email address or password'
          break
        default:
          error = 'Check your internet connection'
      }
      reject(error || err.message)
    })
  })
}

export const verifyPhoneNumber = {
  sendVerificationCode: (phoneNumber) => new Promise((resolve, reject) => {
    firebase.auth().verifyPhoneNumber(phoneNumber)
      .on('state_changed', (phoneAuthSnapshot) => {
        switch (phoneAuthSnapshot.state) {
          case firebase.auth.PhoneAuthState.CODE_SENT:
            resolve(phoneAuthSnapshot.verificationId)
            break
          case firebase.auth.PhoneAuthState.ERROR:
            console.log(phoneAuthSnapshot.error)
            reject(phoneAuthSnapshot.error.message)
            break
        }
    }).catch(err => {
      let error = null
      switch(err.code) {
        case 'auth/captcha-check-failed':
          error = 'Something went wrong. Please try again in a couple of minutes'
          break
        case 'auth/invalid-phone-number':
        case 'auth/missing-phone-number':
          error = "The phone number you entered is invalid"
          break
        case 'auth/quota-exceeded':
          error = 'You have tried requesting too many messages'
          break
        case 'auth/user-disabled':
          error = 'This user has been disabled, contct the admin'
          break
        default:
          error = 'Check your internet connection'
          break
      }
      reject(error || err.message)
    })
  }),
  confirmVerificationCode: (verificationId, userCode) => new Promise(resolve => {
    resolve(firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    userCode
    ))
  }),
  addToDB: (phoneCredintial) => new Promise((resolve, reject) => {
    firebase.auth().currentUser.updatePhoneNumber(phoneCredintial)
    .then(() => {
      const { uid } = firebase.auth().currentUser
      let updates = {
        isPhoneVerified: true,
      }
      firebase.database().ref('users/' + uid).update(updates)
      resolve()
    })
    .catch(err => {
      switch(err.code) {
        case 'auth/invalid-verification-code':
          error = 'The verification code you entered is invalid'
          break
        case 'auth/invalid-verification-id':
          error = 'Something went wrong with verifying your phone number. Please try again later'
          break
        default:
          error = 'Try again in a few minutes, if it doesn\'t work, contact admin'
      }
      reject(error || err.message)
    })
  }),
}

export const addBook = form => {
  return new Promise((resolve, reject) => {
    const newListingRef = firebase.database().ref('listings').push()
    newListingRef.set({
      ...form,
      search: form.title.toLowerCase(),
      id: newListingRef.key,
    })
    resolve(newListingRef.key)
  })
}

// https://github.com/dailydrip/react-native-firebase-storage/blob/master/src/App.js
export const uploadImage = (uri, postId, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri

    const imageRef = firebase.storage().ref('listing_images').child(postId)

    imageRef.put(uploadUri, { contentType: mime })
      .then(() => {
        imageRef.getDownloadURL()
          .then((url) => {
            firebase.database().ref('listings/' + postId).update({
              imageUri: url
            })
            resolve(url)
          })
          .catch((error) => {
            reject(error)
          })
      })
  })
}

export const getUser = id => {
  return new Promise((resolve, reject) => {
    const uid = !id ? firebase.auth().currentUser.uid : id
    firebase.database().ref('users/' + uid).once('value').then(snapshot => {
      const user = snapshot.val()
      console.log(user)
      if (user && user.uid) {
        resolve(user)
      } else {
        reject('User not found')
      }
    })
  })
}

export const getBooks = q => {
  return new Promise((resolve) => {
    if (q === '' || !q) {
      firebase.database().ref('listings').once('value').then(snapshot => {
        const books = snapshot.val()
        resolve(books)
      })
    }
    else {
      q = q.toLowerCase()
      firebase.database().ref('listings')
      .orderByChild('search').startAt(q).endAt(q + "\uf8ff")
      .once('value').then(snapshot => {
        const books = snapshot.val()
        resolve(books)
      })
    }
  })
}

export const signOut = () => {
  firebase.auth().signOut()
}