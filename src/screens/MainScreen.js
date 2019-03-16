import React from 'react'
import { YellowBox } from 'react-native'
import firebase from 'react-native-firebase'

import { createRootNavigator } from '../navigation/router'

YellowBox.ignoreWarnings(['Remote debugger']);

export default class MainScreen extends React.Component {
  constructor() {
    super();
    this.unsubscriber = null;
    this.state = {
      user: null,
    }
  }

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user })
      if (this.unsubscriber) {
        this.unsubscriber()
      }
    });
  }

  render() {
    const Layout = createRootNavigator(this.state.user)
    return <Layout />
  }
}