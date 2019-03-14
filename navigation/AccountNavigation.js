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
  }
}

export default AccountNavigator