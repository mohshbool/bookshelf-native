import React from 'react'
import { Icon } from 'native-base'
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen'
import ListingScreen from '../screens/ListingScreen'

const HomeNavigator = createStackNavigator({
  Listings: {
    screen:HomeScreen
  },
  Listing: {
    screen: ListingScreen
  }
}, {
  initialRouteName: "Listings",
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
})

HomeNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  }
}

export default HomeNavigator