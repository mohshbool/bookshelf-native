import React from 'react'
import { View } from 'react-native'
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
        onDismiss={this.props.onDismiss}
        overlayStyle={{marginVertical: 220}}
        containerStyle={{marginVertical: 20, marginHorizontal: 30}}
      >
        <Input
          placeholder="Price"
          value={this.state.price}
          onChangeText={this.handePriceChange}
          maxLength={4}
          keyboardType="number-pad"
          containerStyle={{ margin: 8, marginRight: 20 }}
          icon={<Icon name='ios-pricetag' style={{fontSize: 26}} />}
        />
        <Button
          title="Confirm" 
          onPress={() => this.props.onConfirm(this.state.price)}
          containerStyle={{ marginHorizontal: 40, marginTop: 40 }}
          buttonStyle={{ paddingVertical: 10 }}
          disabled={!this.state.isPriceValid}
        ></Button>
    </Overlay>
    )
  }
}