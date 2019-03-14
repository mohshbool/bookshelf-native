import { createStackNavigator } from 'react-navigation'

import AddBookScreen from '../screens/AddBookScreen'
import CitiesScreen from '../screens/CitiesScreen'

export default createStackNavigator({
  AddBookForm: {
    screen: AddBookScreen,
  },
  AddBookCities: {
    screen: CitiesScreen,
    navigationOptions: {
      title: "Choose an area",
    }
  }
})