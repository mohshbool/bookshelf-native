import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Icon } from 'native-base'

import Input from '../components/Input'
import Button from '../components/Button'
import Overlay from '../components/Overlay'

export default class PriceOverlayForm extends React.Component {
  state = {
    price: '',
    isPriceValid: false,
  }

  componentWillMount() {
    this.setState({ price: this.props.basePrice })
  }

  handePriceChange = price => {
    this.setState({ price })
    price  = parseFloat(price)
    if ( price > 0 && price < 5001 )
    this.setState({ isPriceValid: true })
    else
    this.setState({ isPriceValid: false })
  }
  
  render() {
    return (
      <Overlay 
        isVisible={this.props.overlayVisible}
        onBackdropPress={this.props.onBackdropPress}
        overlayStyle={styles.overlay}
        containerStyle={styles.container}
      >
        <Input
          placeholder="Price"
          value={this.state.price}
          onChangeText={this.handePriceChange}
          maxLength={4}
          keyboardType="number-pad"
          containerStyle={styles.inputContainer}
          icon={<Icon name='ios-pricetag' style={styles.icon} />}
        />
        <Button
          title="Confirm" 
          onPress={() => this.props.onConfirm(this.state.price)}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          disabled={!this.state.isPriceValid}
        ></Button>
    </Overlay>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    paddingVertical: Platform.OS === 'android' ? 0 : 100,
  },
  container: {
    marginVertical: 20, 
    marginHorizontal: 20,
    backgroundColor: '#c7c7d3',
    borderColor: '#47466f',
    borderWidth: 6,
    borderRadius: 15,
  },
  inputContainer: {
    margin: 8, 
    marginRight: 20,
  },
  icon: {
    fontSize: 26,
  },
  buttonContainer: { 
    marginHorizontal: 40, 
    marginTop: 40,
  },
  button: {
    paddingVertical: 10,
  },
})