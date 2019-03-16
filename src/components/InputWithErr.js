import React from 'react'
import { View, Text, TextInput } from 'react-native'

export default class InputWithErr extends React.Component {
  render() {
    return (
      <View style={{marginVertical: 6}}>
        <TextInput 
          {...this.props}
          style={{
            padding: 10, 
            borderWidth: 1,
            borderColor: this.props.color, 
            borderRadius: 15,
            ...this.props.style
          }}
          returnKeyType={"next"}
          enablesReturnKeyAutomatically
        />
        <Text 
          style={{
            marginTop: 1,
            marginLeft: 8, 
            fontSize: 10, 
            fontStyle: 'italic',
            ...this.props.errStyle
            }}>
          {this.props.errMsg}
        </Text>
      </View>
    )
  }
}
