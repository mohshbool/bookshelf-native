import React from 'react';
import { Provider } from 'react-redux'

import store from './src/store'

import MainScreen from './src/screens/MainScreen'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    )
  }
}