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
  initialRouteName: "Listings"
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