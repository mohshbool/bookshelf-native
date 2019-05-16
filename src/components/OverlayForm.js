import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Icon } from 'native-base'

import Input from '../components/Input'
import Button from '../components/Button'
import Overlay from '../components/Overlay'

export default class OverlayForm extends React.Component {
  state = {
    verificationCode: '',
    isCodeValid: false,
  }

  handleCodeChange = verificationCode => {
    this.setState({ verificationCode })
    if (verificationCode.length === 6)
    this.setState({ isCodeValid: true })
    else
    this.setState({ isCodeValid: false })
  }
  
  render() {
    return (
      <Overlay 
        isVisible={this.props.overlayVisible}
        onBackdropPress={() => this.props.onDismiss(false)}
        overlayStyle={styles.overlay}
      >
        <View style={styles.container}>
          <Input
            placeholder="Verification Code"
            value={this.state.verifcationCode}
            onChangeText={this.handleCodeChange}
            maxLength={6}
            keyboardType="number-pad"
            containerStyle={{ marginVertical: 10 }}
            icon={<Icon type='MaterialCommunityIcons' name='message' style={{fontSize: 26}} />}
          />
          <Button
            title="Verify" 
            onPress={() => this.props.onVerify(this.state.verificationCode)}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            disabled={!this.state.isCodeValid}
          ></Button>
        </View>
    </Overlay>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    
  },
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#c7c7d3',
    borderColor: '#47466f',
    borderWidth: 6,
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: Platform.OS === 'ios' ? 0 : 20,
  },
  buttonContainer: {
    marginHorizontal: 20, 
    marginTop: 40,
  },
  button: { 
    paddingVertical: 12, 
  },
})