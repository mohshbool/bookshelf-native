import React from 'react'
import { View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'

export default class Overlay extends React.Component {
  state = {
    visible: false,
  }

  handleBackdropPress = () => this.setState({ visible: false })

  render() {
    return (
      <Modal 
        isVisible={this.props.isVisible || this.state.visible}
        avoidKeyboard={this.props.avoidKeyboard || false}
        onBackdropPress={this.props.onBackdropPress || this.handleBackdropPress}
        onBackButtonPress={this.props.onBackdropPress || this.handleBackdropPress}
        animationIn={this.props.animationIn || 'fadeInUp'}
        animationInTiming={this.props.animationInTiming || 300}
        animationOut={this.props.animationOut || 'fadeOutUp'}
        animationOutTiming={this.props.animationInTiming || 300}
        style={StyleSheet.flatten([styles.overlay, this.props.overlayStyle])}
      >
        <View style={StyleSheet.flatten([styles.overlayContainer, this.props.containerStyle])}>
          {this.props.children}
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    marginVertical: 75,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 15,
    backgroundColor: '#fff',
  },
})