import React from 'react'
import { Alert, View, StyleSheet } from 'react-native'
import { Container, Icon } from 'native-base'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Input from '../components/Input'
import Button from '../components/Button'

import { 
  updateFormActionCreator,
  clearFormActionCreator as clearLoginFormActionCreator,
  loginUserActionCreator,
  validateFormActionCreator
} from '../actions/loginActionCreators'
import { 
  clearFormActionCreator as clearRegisterFormActionCreator
} from '../actions/registerActionCreators'
import { trimAll } from '../util';

class LoginScreen extends React.Component {
  validateForm = () => {
    if (this.props.user.password.length >= 6 &&
      /^[^@]+@[^@]{2,}\.[^@]{2,}$/i.test(this.props.user.email)) {
        this.props.validateForm(true)
    }
    else this.props.validateForm(false)
  }

  handleEmailChange = email => {
    this.props.update({ email })
    this.validateForm()
  }
  handlePasswordChange = password => {
    this.props.update({ password })
    this.validateForm()
  }

  login = () => {
    const user = {
      email: trimAll(this.props.user.email),
      password: this.props.user.password
    }
    this.props.login(user).then(() => {
      this.props.clearLogin()
      this.props.clearRegister()
      this.props.navigation.navigate('SignedIn')
    }).catch(() => Alert.alert(
      'Error',
      this.props.loginStatus,
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.update({ password: '' })
            this.props.validateForm(false)
          },
          style: 'destructive',
        },
      ],
    ))
  }
  render() {
    return (
      <Container>
        <KeyboardAwareScrollView 
          style={{backgroundColor: '#c7c7d3'}}
          contentContainerStyle={styles.container}
        >
          <Input
            autoFocus
            placeholder="E-mail"
            value={this.props.user.email}
            onChangeText={this.handleEmailChange}
            textContentType="username"
            containerStyle={styles.containerStyle}
            icon={<Icon name='ios-mail' style={styles.icon} />}
            onSubmitEditing={() => this.password.focus()}
          />
          <Input
            placeholder="Password"
            value={this.props.user.password}
            onChangeText={this.handlePasswordChange}
            textContentType="password"
            secureTextEntry
            contextMenuHidden
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            icon={<Icon name='ios-lock' style={styles.icon} />}
            ref={input => this.password = input}
          />
          <Button 
            title="Log In" 
            onPress={this.login}
            containerStyle={styles.button}
            buttonStyle={{paddingVertical: 10}}
            disabled={!this.props.isValid}
          />
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    margin: 5, 
    paddingHorizontal: 10, 
    paddingTop: 70 
  },
  containerStyle : { 
    marginVertical: 10, 
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
  button: {
    marginVertical: 20,
    marginHorizontal: 30
  },
})


const mapStateToProps = state => ({
  user: state.login.updateForm,
  loginStatus: state.login.loginUser,
  isValid: state.login.validateForm
})

const mapDispatchToProps = {
  update: updateFormActionCreator,
  clearLogin: clearLoginFormActionCreator,
  login: loginUserActionCreator,
  validateForm: validateFormActionCreator,
  clearRegister: clearRegisterFormActionCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)