import React from 'react'
import { Icon } from 'native-base'
import { 
  createAppContainer, 
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation"

import SignedIn from './SignedInNavigation'

import Register from '../screens/RegisterScreen'
import Login from '../screens/LoginScreen'

export const SignedOut = createStackNavigator(
  {
    Register: {
      screen: Register,
      navigationOptions: {
        title: "Register",
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        title: "Log In",
      }
    }
  }, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#c7c7d3',
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 3 },
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      headerTitleStyle: {
        color: '#47466f'
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

export const createRootNavigator = (user = null) => {
  return createAppContainer(createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: !user ? "SignedOut" : "SignedIn",
    }
  ))
}