import React from 'react';
import {
  Alert,
  Text, 
  View,
} from 'react-native';
import { Root, Container, Content } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { Button as NButton, Icon } from 'native-base'

import Input from '../components/Input'
import Button from '../components/Button'
import OverlayForm from '../components/OverlayForm'

import { 
  updateFormActionCreator, 
  updateOverlayVisibiltyActionCreator,
  sendVerificationCodeActionCreator,
  confirmVerificationCodeActionCreator,
  addToDBActionCreator,
} from '../actions/phoneActionCreators'

import { formatOnE164, reportInfo } from '../util'

class verifyPhoneNumberScreen extends React.Component {
  static navigationOptions = {
    headerVisible: false,
    header: null,
  }

  componentWillMount() {
    if (!this.props.phoneNumber)
    this.props.updateForm({ phoneNumber: this.props.basePhoneNumber })
  }

  back = () => {
    this.props.navigation.goBack()
  }

  handlePhoneChange = phone => {
    this.props.updateForm({ phoneNumber: phone })
  }

  sendVerificationCode = () => {
    let phone = this.props.phoneNumber
    console.log(this.props.sendVerification)
    if (/\+\d{11,13}/.test(phone)) {
      this.props.sendVerificationCode(phone).then(() => {
        console.log(this.props.sendVerification)
        this.props.updateVisibilty(true)
      }).catch(error => {
        //TODO ERROR REPORTING ON THE CODE SENDING PROCCESS
        reportInfo(this.props.sendVerification.error, 'danger')
      })
    } else {
      //TODO ERROR REPORTING ON THE FORMAT BEING INVALID
      reportInfo('Invalid phone number format', 'danger')
    }
  }

  verifyCode = userCode => {
    const verificationId = this.props.sendVerification.id
    if (verificationId) {
      this.props.confirmVerificationCode(verificationId, userCode).then(credntial => {
        console.log('creating the credntial worked')
        this.props.addToDB(credntial).then(() => {
          //TODO PHONE VERIFICATION SUCCESS
          //TODO PUSH NOTIFICATION
          this.props.updateVisibilty(false)
          this.props.navigation.navigate('Account')
          console.log("EVERYTHING WORKED!!!")
        }).catch(() => {
          //TODO ERROR REPORTING ON A PROBLEM WITH ADDING THE PHONE TO THE DATABASE
          //reportInfo('There was a problem adding your verified phone number to the database', 'danger')
          console.log(this.props.addPhoneToDB)
          Alert.alert(
            'Invalid Verification Code',
            this.props.addPhoneToDB,
            [
              {
                text: 'Okay',
                style: 'destructive',
                onPress: () => {
                  this.props.updateVisibilty(false)
                  setTimeout(this.forceUpdate, 10)
                }
              }
            ]
          )
        })
      }).catch(() => {
        //TODO ERROR REPORTING ON PROBLEMS WITH VERIFYING THE CODE
        //reportInfo('There was a problem verifying your phone number', 'danger')
        console.log(this.props.confirmVerification)
      })
    }
    else {
    //ERROR REPORTING ON A PROBLEM OCCURING
    }
  }

  render() {
    console.log(this.props.state)
    return (
      <Root>
        <Container style={{backgroundColor: '#c7c7d3'}}>
          <Content>
            <OverlayForm 
              overlayVisible={this.props.overlayVisible}
              onDismiss={this.props.updateVisibilty}
              onVerify={this.verifyCode}
            />
            <KeyboardAwareScrollView 
              enableAutomaticScroll={!this.props.overlayVisible}
            >
              <NButton transparent style={{marginTop: 40,}} onPress={this.back}>
                <Icon name='ios-arrow-back' style={{fontSize: 26, color: '#47466f'}}/>
                <Text style={{fontSize: 18, color: '#59587d'}}>Back</Text>
              </NButton>
              <View style={{margin: 5, marginTop: 180}}>
                <View style={{ marginLeft: 16, marginBottom: 30 }}>
                  <Text style={{ fontSize: 18, fontWeight: '600', color: '#47466f' }}>
                    Make sure this your phone number
                  </Text>
                </View>
                <Input
                  placeholder="Phone Number"
                  value={this.props.phoneNumber}
                  onChangeText={this.handlePhoneChange}
                  maxLength={13}
                  dataDetectorTypes="phoneNumber"
                  keyboardType="number-pad"
                  textContentType="telephoneNumber"
                  enablesReturnKeyAutomatically
                  containerStyle={{ marginVertical: 10 }}
                  inputContainerStyle={{ padding: 5 }}
                  inputStyle={{color: '#383858', fontWeight: '500'}}
                  icon={<Icon name='ios-call' style={{fontSize: 26, color: '#47466f',}}></Icon>}
                  ref={input => this.phone = input} 
                />
                <Button
                  title="Send Verification Code" 
                  onPress={this.sendVerificationCode}
                  containerStyle={{ marginHorizontal: 20, marginTop: 40 }}
                  buttonStyle={{ paddingVertical: 15 }}
                />
              </View>
            </KeyboardAwareScrollView>
          </Content>
        </Container>
      </Root>
    )
  }
}

const mapStateToProps = state => ({
  state,
  phoneNumber: state.phone.updateForm.phoneNumber,
  basePhoneNumber: formatOnE164(state.user.updateUser.phoneNumber),
  overlayVisible: state.phone.updateOverlayVisibilty,
  sendVerification: state.phone.sendVerificationCode,
  confirmVerification: state.phone.confirmVerificationCode,
  addPhoneToDB: state.phone.addPhoneToDB
})

const mapDispatchToProps = {
  updateForm: updateFormActionCreator,
  updateVisibilty: updateOverlayVisibiltyActionCreator,
  sendVerificationCode: sendVerificationCodeActionCreator,
  confirmVerificationCode: confirmVerificationCodeActionCreator,
  addToDB: addToDBActionCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(verifyPhoneNumberScreen)