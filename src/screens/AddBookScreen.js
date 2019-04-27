import React from 'react'
import { Text, View, TouchableOpacity, Platform, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Root, Container, Content, Form, Picker, Icon, Textarea } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-picker'

import Input from '../components/Input'
import Button from '../components/Button'
import PriceOverlayForm from '../components/PriceOverlayForm'

import {
  updateFormActionCreator,
  updateFormValidityActionCreator,
  updateOverlayVisibilityActionCreator,
  updateSuggestionActionCreator,
  getBooksActionCreator,
  addBookActionCreator,
  uploadImageActionCreator,
  clearFormActionCreator
} from '../actions/addBookActionCreators'

import { reportInfo, trimAll } from '../util'

class AddBookScreen extends React.Component {
  static navigationOptions = {
    headerVisible: false,
    header: null,
  }

  componentWillMount() {
    const { form, updateForm } = this.props
    if (!form.type && Platform.OS === 'android') {
      updateForm({ type: 'free' })
    }
  }

  validateForm = () => setTimeout(() => {
    const form = this.props.form
    if (!form.title || !form.author || !form.location.full || !form.type || !form.descreption 
      || (!form.imageUri && !form.GRimageUrl)
      || (form.type === 'Sell' && form.price <= 0)) {
      this.props.updateFormValidity(false)
    } else {
      this.props.updateFormValidity(true)
    }
  }, 10)

  formatForm = form => {
    const { title, author, descreption } = form
    return {
      title: trimAll(title),
      author: trimAll(author),
      descreption: trimAll(descreption),
    }
  }

  handleTitleChange = title => {
    this.props.updateForm({ title })
    if (title.length > 1) {
      if (this.delay) clearTimeout(this.delay)
      this.delay = setTimeout(() => {
        this.props.getBooks(title).then(books => {
          this.props.updateSuggestion({...books[0]})
        }).catch(() => {})
      }, 30)
    }
    else {
      this.props.updateSuggestion({id: '', title: ''})
    }
    this.validateForm()
  }
  handleAuthorChange = author => {
    this.props.updateForm({ author })
    this.validateForm()
  }
  handleTypeChange = type => {
    this.props.updateForm({ type: type, price: '' })
    if (type === 'sell') {
      this.props.updateOverlayVisibility(true)
    }
    else {
      this.props.updateOverlayVisibility(false)
    }
    this.validateForm()
  }
  handleDescreptionChange = descreption => {
    this.props.updateForm({ descreption })
    this.validateForm()
  }
  handleChooseImage = () => {
    ImagePicker.showImagePicker(null, (response) => {
      if (response.didCancel) {
        reportInfo('If you don\'t choose an image, one will be chosen for you based on the suggestion you chose')
      } else if (response.error) {
        reportInfo('Something went wrong while picking the image. Please try again later', 'danger')
      } else {
        this.props.updateForm({ imageUri: response.uri })
      }
      this.validateForm()
    })
  }
  handleSuggestion = () => {
    const suggestion = this.props.suggestion
    if (suggestion.id) {
      let book = {
        title: suggestion.title,
        author: suggestion.author.name,
        GRimageUrl: suggestion.imageUrl
      }
      this.props.updateForm({...book})
      this.props.updateSuggestion({title: ''})
    }
    this.validateForm()
  }

  submit = () => {
    const success = () => {
      reportInfo('Your post was added', null, null, 'top')
      this.props.clearForm()
      setTimeout(() => this.props.navigation.navigate("Home", {
        shouldComponentUpdate: true
      }), 10)
    }

    // IF USER DIDNT PROVIDE IMAGE, A SUGGESTION MUST BE CHOSEN.
    // IMAGE WILL BE PROVIDED BY GOODREADS
    if (!this.props.form.imageUri && this.props.suggestion.imageUrl) {
      this.props.updateForm({ imageUri: this.props.form.GRimageUrl })
    }

    this.props.updateForm(this.formatForm(this.props.form))

    setTimeout(() => this.props.addBook({uid: this.props.uid, ...this.props.form}).then(postId => {
      if (this.props.form.imageUri !== this.props.form.GRimageUrl) {
        this.props.uploadImage(this.props.form.imageUri, postId).then(success).catch(error => {
          reportInfo('Your picture wasn\'t uploaded. Please try again later', 'danger')
        })
      } else success()
    }), 10)
  }

  render () {
    return (
      <Root>
        <Container>
          <Content style={{backgroundColor: '#c7c7d3'}}>
            <PriceOverlayForm 
              overlayVisible={this.props.isOverlayVisible}
              onBackdropPress={() => {
                this.props.updateOverlayVisibility(false)
                if (!this.props.form.price){
                  reportInfo('You need to have a price when selling', 'warning', null, 'top')
                  this.props.updateForm({ 
                    type: Platform.OS === 'android' ? 'free' : '', 
                    price: '' 
                  })
                }
              }}
              onConfirm={price => {
                this.props.updateOverlayVisibility(false)
                this.props.updateForm({ price })
                this.validateForm()
              }}
              basePrice={this.props.form.price}
            />
            <KeyboardAwareScrollView
              enableAutomaticScroll={!this.props.isOverlayVisible}
            >
              <View style={styles.container}>
                <View style={{ marginVertical: 0.5 }}>
                  <Input
                    placeholder="Title"
                    value={this.props.form.title}
                    onChangeText={this.handleTitleChange}
                    autoCapitalize="sentences"
                    onSubmitEditing={() => this.author.focus() }
                  />
                <TouchableOpacity 
                  style={styles.suggestionContainer}
                  hitSlop={{top: 5, left: 1, bottom: 5, right: 5}}
                  onPress={this.handleSuggestion}
                >
                  <Text style={styles.suggestionText}
                  >
                    {this.props.suggestion.title && 
                    `Did you mean ${this.props.suggestion.title}`}
                  </Text>
                </TouchableOpacity>
              </View>
                <Input
                  placeholder="Author"
                  value={this.props.form.author}
                  onChangeText={this.handleAuthorChange}
                  autoCapitalize="sentences"
                  ref={input => this.author = input}
                />
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('AddBookCities', {
                    onPress: location => {
                      this.props.updateForm({ location })
                      this.validateForm()
                    }
                  })}
                >
                  <View style={styles.locationContainer}>
                    <Text style={styles.location(!this.props.form.location.full)}>
                        {!this.props.form.location.full 
                        ? 'Choose location'
                        : this.props.form.location.full}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Form style={styles.form}>
                  <Picker
                    note
                    mode="dropdown"
                    placeholder="Choose the type of listing"
                    placeholderStyle={{ color: '#7e7d9a' }}
                    selectedValue={this.props.form.type}
                    onValueChange={this.handleTypeChange}
                  >
                    <Picker.Item label="FREE" value="free" />
                    <Picker.Item label="Trade" value="trade" />
                    <Picker.Item label="Sell" value="sell" />
                  </Picker>
                </Form>
                <Form style={styles.form}>
                  <Textarea 
                    rowSpan={4}  
                    placeholder={"Write a short description about your book." + 
                      " Condition, location details or other details"} 
                    placeholderTextColor="#7e7d9a"
                    style={{ fontSize: 17 }}
                    value={this.props.form.descreption}
                    onChangeText={this.handleDescreptionChange}
                  />
                </Form>
                <Button
                  title="Choose an image" 
                  icon={<Icon 
                    type="MaterialCommunityIcons" 
                    name="file-image" 
                    style={{
                      fontSize: 24,
                      color: '#c7c7d3'
                    }}
                  />}
                  onPress={this.handleChooseImage}
                  buttonStyle={{ paddingVertical: 10 }}
                  containerStyle={styles.imageButtonContainerStyle}
                />
                <Button
                  title="Submit" 
                  onPress={this.submit}
                  buttonStyle={{ paddingVertical: 12 }}
                  containerStyle={styles.submitButtonContainer}
                  disabled={!this.props.isFormValid}
                />
              </View>
            </KeyboardAwareScrollView>
          </Content>
        </Container>
      </Root>
    )
  }
}

const styles = {
  container: {
    alignContent: 'center',
    margin: 5, 
    paddingHorizontal: 10, 
    paddingTop: 30,
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? Dimensions.get('window').height * 0.85 : '100%'
  },
  suggestionContainer: {
    marginTop: 3, 
    marginLeft: 18,
  },
  suggestionText: {
    fontSize: 13, 
    fontStyle: 'italic', 
    fontWeight: '500',
    color: '#47466f',
  },
  imageButtonContainerStyle: {
    marginTop: 20,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  submitButtonContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  locationContainer: {
    marginVertical: 20,
    marginLeft: 12, 
    marginRight: 10,
    borderBottomWidth: 1, 
    borderBottomColor: '#808080',
  },
  location: placeholder => ({
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 18,
    color: placeholder ? '#7e7d9a' : 'black',
  }),
  form: {
    marginHorizontal: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#808080',
    color: 'black',
  },
}

const mapStateToProps = state => ({
  form: state.addBook.updateForm,
  isFormValid: state.addBook.updateFormValidity,
  isOverlayVisible: state.addBook.updateOverlayVisibility,
  suggestion: state.addBook.updateSuggestion,
  addBookStatus: state.addBook.addBook,
  uploadImageStatus: state.addBook.uploadImage,
  uid: state.user.updateUser.uid,
})

const mapDispatchToProps = {
  updateForm: updateFormActionCreator,
  updateFormValidity: updateFormValidityActionCreator,
  updateOverlayVisibility: updateOverlayVisibilityActionCreator,
  updateSuggestion: updateSuggestionActionCreator,
  getBooks: getBooksActionCreator,
  addBook: addBookActionCreator,
  uploadImage: uploadImageActionCreator,
  clearForm: clearFormActionCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookScreen)