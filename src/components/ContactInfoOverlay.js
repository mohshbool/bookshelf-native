import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'

import Overlay from './Overlay'

export default class ContactInfoOverlay extends React.Component {
  render() {
    const { isVisible, onDismiss, email, phoneNumber } = this.props
    return (
      <Overlay 
        isVisible={isVisible}
        onBackdropPress={() => onDismiss(false)}
        overlayStyle={styles.overlay}
        containerStyle={styles.container}
      >
        <View style={styles.email.container}>
          <Icon name="ios-mail" style={styles.email.icon} />
          <Text style={styles.email.text}>{email}</Text>
        </View>
        <View style={styles.phone.container}>
          <Icon name="ios-call" style={styles.phone.icon} />
          <Text style={styles.phone.text}>{phoneNumber}</Text>
        </View>
      </Overlay>
    )
  }
}

const styles = {
  overlay: {
    marginVertical: 240,
    marginHorizontal: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#c7c7d3',
    borderColor: '#47466f',
    borderWidth: 6,
    borderRadius: 15,
  },
  email: {
    container: {
      flexDirection: 'row',
      marginVertical: 10,
    },
    icon: {
      fontSize: 30,
      marginRight: 20,
      marginTop: 5,
      color: 'black',
    },
    text: {
      fontSize: 27,
      fontWeight: '400',
      fontStyle: 'italic',
      color: 'black',
    },
  },
  phone: {
    container: {
      flexDirection: 'row',
      marginVertical: 10,
    },
    icon: {
      fontSize: 30,
      marginRight: 20,
      marginTop: 5,
      color: 'black',
    },
    text: {
      fontSize: 26,
      fontWeight: '500',
      color: 'black',
    },
  },

}