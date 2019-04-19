import { parseString } from 'react-native-xml2js'
import { Toast } from 'native-base'

export const getBooks = q => new Promise((resolve, reject) => {
	let books = []
	if (q.length > 1) {
		fetch(
			'https://www.goodreads.com/search/index.xml?' +
			`q=${q}` + 
			'&key=Sv0DSYs3oaKW6NCzBkzwqQ`'
		).then(info => {
			parseString(info._bodyInit, {trim: true, normalize: true}, (err, result) => {
				for (let i = 0; i < result.GoodreadsResponse.search[0].results[0].work.length; i++) {
					let currentBook = result.GoodreadsResponse.search[0].results[0].work[i].best_book[0]
					books.push({
						type: currentBook.$.type,
						id: currentBook.id[0]._,
						title: currentBook.title[0],
						author: {
							id: currentBook.author[0].id[0]._,
							name: currentBook.author[0].name[0],
						},
						imageUrl: currentBook.image_url[0],
						smallImageUrl: currentBook.small_image_url[0],
					})
				}
			})
			resolve(books)
		}).catch(error => reject(error))}
	else reject()
})

//https://stackoverflow.com/a/8358141/10244931
export function formatPhoneNumber(phoneNumberString) {
	let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
	let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
	if (match) {
		return '(' + match[1] + ') ' + match[2] + '-' + match[3]
	}
	return null
}

// A function to format a string on the standard E.164 format
export function formatOnE164(phone) {
	if (/\(\d{3}\)\s\d{3}\-\d{4}/.test(phone)) {
		let cleaned = phone.replace(/\(0|\)|\s|-/g, '')
		let newPhone = '+962' + cleaned
		return newPhone
	}
	else return phone
}

// A function to ensure register form validation
export const arePropsValid = props => {
	for (let prop of Object.values(props)) {
		if ( (prop.err !== '' && !/password/i.test(prop.err)) || prop.err === 'Password strength: Unacceptable') {
			return false
		}
	}
	console.log("HRERE")
	return true
}

export const objectToArray = object => {
	let array = []
	for (let values of Object.values(object)){
		console.log(values)
		if (!values.id) return
		array.push(values)
	}
	return array
}

// https://coderwall.com/p/_g3x9q/how-to-check-if-javascript-object-is-empty
export const isObjEmpty = object => {
  for (let key in object) {
    if(object.hasOwnProperty(key))
      return false
  }
  return true
}

export const upperCaseFirstLetter = string => {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export const upperCaseFirstLetterInWords = string => {
	return string.split(' ').map(word => { 
		if (word !== '') return upperCaseFirstLetter(word) 
	}).join(' ')
}

// A fucntion to get current date formatted
export const getCurrentDate = () => {
	return new Date().toLocaleString(undefined, {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	})
}

// A function to trim all whitespace, new line and dot characters
export const trimAll = string => {
	let str = []
	for (let i = 0; i < string.length; i++) {
		str.push(string[i])
  }
	str = str.join('')
	const l = str.length - 1
	while(true) {
		if (
			str[0] === ' ' || str[0] === '.' || str[0] === '\n' ||
			str[l] === ' ' || str[l] === '.' || str[l] === '\n') {
				str = str.trim().replace(/^\.+/, "").replace(/\.+$/, "")
				continue
		} else {
			return str
		}
	}
}

export function reportInfo(error, type, onDismiss, position) {
	if (!error) throw new Error('Report message missing')
	type = !type ? 'default' : type
	onDismiss = !onDismiss ? () => {} : onDismiss
	position = !position ? 'bottom' : position
	Toast.show({
		text: error,
		textStyle: {
			fontSize: 15,
		},
		buttonText: 'Dismiss',
		buttonStyle: {
			borderColor: '#fff',
			borderWidth: 0.2,
			borderRadius: 12,
			padding: 5,
			marginHorizontal: 5,
		},
		type: type,
		duration: 5000,
		position: position,
		onClose: onDismiss,
	})
}