import React from 'react'
import { Icon } from 'native-base'
import { createStackNavigator } from 'react-navigation'

import AddBookScreen from '../screens/AddBookScreen'
import CitiesScreen from '../screens/CitiesScreen'

export default createStackNavigator(
  {
    AddBookForm: {
      screen: AddBookScreen,
    },
    AddBookCities: {
      screen: CitiesScreen,
      navigationOptions: {
        title: "Choose an area",
      }
    }
  }, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#c7c7d3'
      },
      headerBackTitleStyle: {
        color: '#101010'
      },
      headerBackImage: (tintColor, title) => (
        <Icon name="ios-arrow-back" style={{
          fontSize: 23, 
          color: '#101010', 
          paddingLeft: 15,
          paddingRight: 7,
          }} 
        />
      )
    }
  }
)