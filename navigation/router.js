import { 
  createAppContainer, 
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation"

import SignedIn from './SignedInNavigation'

import Register from '../screens/RegisterScreen'
import Login from '../screens/LoginScreen'

export const SignedOut = createStackNavigator({
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
})

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