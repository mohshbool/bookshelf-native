import React from 'react'
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { Icon } from 'native-base'
import { upperCaseFirstLetterInWords } from '../util'

export default class ListingRow extends React.Component {
  _onPress = () => {
    const { id, onDelete } = this.props.item
    onDelete(id)
  }
  render() {
    const { title, imageUri } = this.props.item
    const TouchableComponent = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image 
            style={styles.image}
            source={{ uri: imageUri }} 
            resizeMode="stretch"
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{upperCaseFirstLetterInWords(title)}</Text>
        </View>
        <TouchableComponent onPress={this._onPress} activeOpacity={0.5}>
          <View style={styles.iconContainer}>
            <Icon 
              name="ios-trash"
              style={styles.icon}
            />
          </View>
        </TouchableComponent>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: '#c7c7d3',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1.5, width: 4 },
    shadowOpacity: 1.5,
    shadowRadius: 5,
  },
  imageContainer: {
    marginVertical: 2,
    marginLeft: 8,
    marginRight: 6,
    alignContent: 'stretch'
  },
  image: { 
    flex: 1,
    minWidth: 80, 
    minHeight: 110, 
    maxHeight: 120,
    borderRadius: 2,
  },
  titleContainer: {
    flexGrow: 2,
    width: 0,
    maxHeight: 120,
    paddingLeft: 12,
    paddingRight: 20,
  },
  title: {
    fontSize: 21.5,
    color: '#47466f',
  },
  iconContainer: {
    paddingRight: 20
  },
  icon: {
    fontSize: 30,
    color: '#47466f'
  },
})