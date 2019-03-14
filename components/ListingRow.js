import React from 'react'
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { upperCaseFirstLetter, upperCaseFirstLetterInWords } from '../util'

export default class ListingRow extends React.Component {
  render() {
    const {
      title,
      author,
      location,
      type,
      price,
      imageUri,
    } = this.props.listing
    const TouchableComponent = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback
    return (
      <TouchableComponent onPress={this.props.onPress} activeOpacity={0.5}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image 
              style={styles.image}
              source={{ uri: imageUri }} 
              resizeMode="stretch"
            />
          </View>
          <View style={styles.text}>
            <View style={styles.view}>
              <Text style={styles.title}>{upperCaseFirstLetterInWords(title)}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.author}>{upperCaseFirstLetterInWords(author)}</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.location}>{location.full}</Text>
            </View>
          </View>
          <View style={pricingStyles.container}>
            <View style={pricingStyles.type.box(type)}>
              {type === 'sell' ? (
                <Text style={pricingStyles.type.text(type)}>{price  + "  JD"}</Text>
              ) : (
                <Text style={pricingStyles.type.text(type)}>{upperCaseFirstLetter(type)}</Text>
              )}
            </View> 
          </View>
        </View>
      </TouchableComponent>
    )
  }
}

const getTypeColor = type => {
  switch(type) {
    case 'free':
      return 'black'
    case 'trade':
      return 'yellow'
    case 'sell':
      return '#3f2a14'
  }
}
const getMarginRight = type => {
  switch(type) {
    case 'free':
    case 'sell':
      return 10
    case 'trade':
      return 0
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 8,
    marginBottom: 1,
    backgroundColor: '#47466f'
  },
  imageContainer: {
    marginVertical: 2,
    marginLeft: 8,
    marginRight: 2,
    alignContent: 'stretch'
  },
  image: { 
    flex: 1,
    minWidth: 75, 
    minHeight: 100, 
    borderRadius: 2,
  },
  text: {
    flexGrow: 1,
    width: 0,
    paddingLeft: 12,
    paddingRight: 20,
    alignContent: 'space-between',
  },
  view: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#f9f7e2',
  },
  author: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#aba991',
  },
  location: {
    fontSize: 16,
    color: '#c0c0c0',
  }
})

const pricingStyles = {
  container: {
    marginRight: 10,
    justifyContent: 'center',
  },
  type: {
    box: type => ({
      marginBottom: 15,
      marginRight: getMarginRight(type)
    }),
    text: type => ({
      fontSize: 20,
      color: getTypeColor(type)
    }),
  },
  price: {
    container: {
      marginLeft: 10
    },
    text: {
      fontSize: 24,
      fontWeight: '400',
    },
  }
}