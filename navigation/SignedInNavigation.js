import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { Icon } from 'native-base'

import HomeNavigator from './HomeNavigation'
import AddBookNavigation from './AddBookNavigation'
import AccountNavigation from './AccountNavigation'

export default createBottomTabNavigator(
  {
    Home: HomeNavigator,
    AddBook: {
      screen: AddBookNavigation,
    }, 
    Account: AccountNavigation
  }, 
  {
    swipeEnabled: false,
    animationEnabled: true,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName
        switch(routeName) {
          case 'Home': iconName = 'home'; break;
          case 'AddBook': iconName = 'book-multiple-plus'; break;
          case 'Account': iconName = 'account'; break;
        }
        return <Icon 
          type="MaterialCommunityIcons" 
          name={iconName} 
          style={{
            fontSize: 28,
            color: tintColor,
          }} 
        />
      },
    }),
    backBehavior: 'none',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#31314d',
      inactiveTintColor: '#9090a8',
    },
  },
)
