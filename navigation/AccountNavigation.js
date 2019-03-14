import React from 'react'
import { Icon } from 'native-base'
import { createStackNavigator } from 'react-navigation';

import AccountScreen from '../screens/AccountScreen'
import verifyPhoneNumberScreen from '../screens/verifyPhoneNumberScreen'

const AccountNavigator = createStackNavigator({
  Account: {
    screen: AccountScreen
  },
  VerifyPhoneNumber: {
    screen: verifyPhoneNumberScreen
  }
}, {
  initialRouteName: "Account"
})

AccountNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
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

export default AccountNavigator