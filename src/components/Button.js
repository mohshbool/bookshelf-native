import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
 
export default class Button extends React.Component {
  render() {
    const { disabled } = this.props
    return (
      <View style={StyleSheet.flatten([styles.container, this.props.containerStyle])}>
        <TouchableOpacity 
          onPress={this.props.onPress || null}
          activeOpacity={0.3} 
          disabled={disabled || false}
        >
          <View style={StyleSheet.flatten([styles.button(disabled, this.props.backgroundColor), this.props.buttonStyle])}>
            {this.props.icon && (
              <View style={StyleSheet.flatten([styles.iconContainer, this.props.iconContainerStyle])}>
                {this.props.icon}
              </View>
            )}
            {!!this.props.title && (
              <Text style={StyleSheet.flatten([styles.title, this.props.buttonTitleStyle])}>
                {this.props.title}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const getBackgroundColor = (disabled, backgroundColor) => {
  // Disabled
  if (disabled)
    return '#77777e'
  // Default
  else if (!disabled && backgroundColor) 
    return backgroundColor
  // Active Color
  else if (!disabled && !backgroundColor)
    return '#47466f'
}

const styles = {
  button: (disabled, backgroundColor) => ({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: getBackgroundColor(disabled, backgroundColor),
    padding: 8,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
  }),
  container: {
    borderRadius: 3,
    maginVertical: 5,
  },
  title: {
    color: '#c7c7d3',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 2,
    paddingBottom: 1,
  },
  iconContainer: {
    marginHorizontal: 8,
  },
}