import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import 'react-native-gesture-handler'

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
      activeTintColor: '#c7c7d3',
      activeBackgroundColor: '#47466f',
      inactiveTintColor: '#9090a8',
      inactiveBackgroundColor: '#c7c7d3',
      style: {
        backgroundColor: '#c7c7d3',
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 3 },
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      tabStyle: {
        marginHorizontal: 12,
        marginVertical: 3,
        borderRadius: 5,
      }
    },
  },
)
