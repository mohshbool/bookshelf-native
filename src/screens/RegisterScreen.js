import React from 'react'
import {
  View, 
  Alert, 
  StyleSheet, 
  Text, 
  Platform,
  TouchableOpacity, 
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Icon } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../components/Input'
import Button from '../components/Button'

import { formatPhoneNumber, arePropsValid, trimAll } from '../util'
import { 
  updateFormActionCreator,
  registerUserActionCreator,
  validateFormActionCreator,
  clearFormActionCreator as clearRegisterFormActionCreator,
} from '../actions/registerActionCreators'
import {
  clearFormActionCreator as clearLoginFormActionCreator
} from '../actions/loginActionCreators'

class RegisterScreen extends React.Component {
  checkFormValidity = () => setTimeout(() => this.props.validate(arePropsValid(this.props.user)), 5)
  
  handleUsernameChange = username => {
    if (username.length > 3 && username.length < 20) {
      this.props.update({ username: {value: username, color: '#000', err: ''} })
    }
    else {
      this.props.update({ username: {value: username, color: '#ff0000', err: 'Username is between 3 and 20 character'} })
    }
    this.checkFormValidity()
  }

  handleEmailChange = email => {
    if (/^[^@]+@[^@]{2,}\.[^@]{2,}$/i.test(email)) {
      this.props.update({ email: {value: email, color: '#000', err: ''} })
    }
    else {
      this.props.update({ email: {value: email, color: '#ff0000', err: 'Email is on this pattern: characters@characters.domain'} })
    }
    this.checkFormValidity()
  }

  handlePasswordChange = password => {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})/.test(password)) {
      this.props.update({ password: {value: password, color: '#000', err: 'Password strength: Strong'} })
    }
    else if (/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password)) {
      this.props.update({ password: {value: password, color: '#007000', err: 'Password strength: Medium'} })
    }
    else if (/^(?=.*[0-9])(?=.{8,})/.test(password)) {
      this.props.update({ password: {value: password, color: '#cccc00', err: 'Password strength: Weak'} })
    }
    else {
      this.props.update({ password: {value: password, color: '#ff0000', err: 'Password strength: Unacceptable'} })
    }
    this.checkFormValidity()
  }

  handlePhoneChange = number => {
    const phone = formatPhoneNumber(number)
    if (phone !== null) {
      this.props.update({ phone: {value: phone, color: '#000', err: ''} })
    } else {
      this.props.update({ phone: {value: number.substring(0, 13) , color: '#000', err: ' '} })
    }
    this.checkFormValidity()
  }

  getIcon = text => {
    let iconName = ''
    switch(text) {
      case "username": iconName = "ios-person"; break;
      case "email": iconName = "ios-mail"; break;
      case "password": iconName = 'ios-lock'; break;
      case "phone": iconName = "ios-call"; break;
    }
    return <Icon type="Ionicons" name={iconName} style={styles.icon} />
  }

  _register = () => {
    const userInfo = {
      username: trimAll(this.props.user.username.value),
      email: trimAll(this.props.user.email.value),
      password: this.props.user.password.value,
      phoneNumber: this.props.user.phone.value,
    }
    this.props.register(userInfo).then(() => { 
      this.props.clearRegister()
      this.props.clearLogin()
      this.props.navigation.navigate('SignedIn')
    }).catch(() => Alert.alert(
      'Error',
      this.props.registerStatus,
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.update({ password: {value: '', color: '#000', err: ' '} })
            this.props.validate(false)
          },
          style: 'destructive',
        },
      ],
    ))
  }

  render() {
    const TouchableComponent = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback
    return (
      <Container>
        <KeyboardAwareScrollView 
          style={{backgroundColor: '#c7c7d3'}} 
          contentContainerStyle={styles.container}
        >
          <View style={styles.inputsContainer}>
            <Input
              placeholder="Username"
              value={this.props.user.username.value}
              onChangeText={this.handleUsernameChange}
              inputStyle={styles.inputStyle}
              errorMessage={this.props.user.username.err}
              errorStyle={{ color: this.props.user.username.color }}
              icon={this.getIcon('username')}
              onSubmitEditing={() => this.email.focus()}
            />
            <Input
              placeholder="E-mail"
              value={this.props.user.email.value}
              onChangeText={this.handleEmailChange}
              textContentType="username"
              inputStyle={styles.inputStyle}
              errorMessage={this.props.user.email.err}
              errorStyle={{ color: this.props.user.email.color }}
              icon={this.getIcon('email')}
              ref={ref => this.email = ref}
              onSubmitEditing={() => this.password.focus()}
            />
            <Input
              placeholder="Password"
              value={this.props.user.password.value}
              onChangeText={this.handlePasswordChange}
              textContentType="password"
              secureTextEntry
              contextMenuHidden
              enablesReturnKeyAutomatically
              inputStyle={styles.inputStyle}
              errorMessage={this.props.user.password.err}
              errorStyle={{ color: this.props.user.password.color }}
              icon={this.getIcon('password')}
              ref={input => this.password = input}
              onSubmitEditing={() => this.phone.focus()}
            />
            <Input
              placeholder="Phone Number"
              value={this.props.user.phone.value}
              onChangeText={this.handlePhoneChange}
              maxLength={14}
              dataDetectorTypes="phoneNumber"
              keyboardType="number-pad"
              textContentType="telephoneNumber"
              returnKeyType={"next"}
              inputStyle={styles.inputStyle}
              errorMessage={this.props.user.phone.err}
              errorStyle={{ color: this.props.user.phone.color }}
              icon={this.getIcon('phone')}
              ref={input => this.phone = input}
            />
          </View>
          <View style={styles.footer}>
            <Button 
              title="Register" 
              onPress={this._register}
              containerStyle={styles.registerButton}
              buttonStyle={{ paddingVertical: 10 }}
              disabled={!this.props.isValid}
            />
            <TouchableComponent
              onPress={() => this.props.navigation.navigate('Login')}
              hitSlop={{top: 15, bottom: 15, left: 10, right: 10}}
            >
              <View style={styles.footerTextTouchable}>
                <Text style={{ fontSize: 18, color: '#47466f'}}>
                  Already have an account?&nbsp;
                  <Text style={{fontWeight: 'bold'}}>
                    Log In
                  </Text>
                </Text>
              </View>
            </TouchableComponent>
          </View>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignContent: 'center',
    paddingHorizontal: 10, 
    height: Platform.OS === 'ios' ? Dimensions.get('window').height * 0.8 : '95%'
  },
  inputsContainer : { 
    height: '65%',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  inputStyle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#47466f',
  },
  icon: {
    fontSize: 26, 
    color: '#47466f'
  },
  footer: {
    justifyContent: 'space-around',
    height: '20%',
    alignItems: 'center',
  },
  footerTextTouchable: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  registerButton: {
    marginHorizontal: 10,
    width: '90%',
  },
})

const mapStateToProps = state => ({
  user: {...state.register.updateForm},
  isValid: state.register.validateForm,
  registerStatus: state.register.registerUser,
})

const mapDispatchToProps = {
  update: updateFormActionCreator,
  register: registerUserActionCreator,
  validate: validateFormActionCreator,
  clearRegister: clearRegisterFormActionCreator,
  clearLogin: clearLoginFormActionCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)