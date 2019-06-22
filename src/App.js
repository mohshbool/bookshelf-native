import React from 'react';
import { Provider } from 'react-redux'

import store from './store'

import MainScreen from './screens/MainScreen'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    )
  }
}