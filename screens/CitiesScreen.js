import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native'
import { Icon } from 'native-base' 

import { citiesDataArray } from '../cities'
export default class CitiesScreen extends React.Component {
  _renderItem = ({item}) => {
    const city = item.key
    return (
    <View>
      <View style={styles.divider}>
        <Text style={styles.dividerText}>{city}</Text>
      </View>
      <FlatList
        data={ [...item.areas] }
        renderItem={({item}) => {
          const area = item.key
          return (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.getParam('onPress')({
                  city,
                  area,
                  full: (city + ', ' + area)
                })
                setTimeout(() => this.props.navigation.navigate('AddBookForm'), 50)
              }}
            >
              <View style={styles.item}>
                <Text style={styles.itemText}>{area}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
        initialNumToRender={30}
      />
    </View>
  )}

  render() {
    console.log(citiesDataArray)
    return (
      <ScrollView>
        <FlatList
          data={ [...citiesDataArray] }
          renderItem={this._renderItem}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  divider: {
    borderTopColor: '#47466f',
    borderTopWidth: 1,
    borderBottomColor: '#47466f',
    borderBottomWidth: 1,
    backgroundColor: '#31314d',
  },
  dividerText: {
    paddingVertical: 5,
    paddingHorizontal: 15, 
    fontSize: 20,
    fontWeight: '300',
    color: '#c7c7d3',
  },
  item: {
    borderBottomColor: '#8c8c8c',
    borderBottomWidth: 0.5,
    backgroundColor: '#c7c7d3'
  },
  itemText: {
    paddingVertical: 12,
    paddingHorizontal: 23,
    fontSize: 15,
    fontWeight: '300',
    color: '#47466f'
  }
})