import React from 'react'
import { View, Text, TextInput, StyleSheet} from 'react-native'

export default class Input extends React.Component {
  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  clear() {
    this.input.clear();
  }

  isFocused() {
    return this.input.isFocused();
  }

  render() {
    return (
      <View style={StyleSheet.flatten([styles.container, this.props.containerStyle])}>
        <View style={StyleSheet.flatten([styles.inputContainer, this.props.containerStyle])}>
          {this.props.icon && (
            <View style={StyleSheet.flatten([styles.iconContainer, this.props.iconContainerStyle])}>
              {this.props.icon}
            </View>
          )}
          <TextInput 
            {...this.props}
            style={StyleSheet.flatten([styles.input, this.props.inputStyle])}
            placeholder={this.props.placeholder || ''}
            blurOnSubmit={this.props.blurOnSubmit || true}
            returnKeyType={this.props.returnKeyType || "next"}
            autoCapitalize={this.props.autoCapitalize || 'none'}
            ref={ref => this.input = ref}
            enablesReturnKeyAutomatically
          />
        </View>
        {!!this.props.errorMessage && (
          <Text style={StyleSheet.flatten([styles.error, this.props.errorStyle])}>
            {this.props.errorMessage}
          </Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
  },
  input: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    flex: 1,
    minHeight: 40,
    paddingHorizontal: 15,
  },
  iconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  error: {
    marginVertical: 6,
    marginHorizontal: 8,
    fontSize: 12,
    fontStyle: 'italic',
  },
})
