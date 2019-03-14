import React from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
const increment = () => ({
  type: 'INCREMENT'
}) 
const getUsers = async () => {
  let user = null
  const req = await fetch('https://jsonplaceholder.typicode.com/users')
  const response = await req.json()
  return response
}
const updateUsers = users => ({
  type: 'REQUEST_SUCCESS',
  payload: users[5].name
})
const updateUser = () => dispatch => {
  dispatch({type: 'REQUEST_SENT'})
  getUsers().then(users => dispatch(updateUsers(users)))
  .catch(err => {
    console.log(err); 
    dispatch({type: 'REQUEST_FAILURE'})
  })
}
class Counter extends React.Component {
  render() {
    return (
      <View>
        <Text style={{fontSize: 40, alignSelf: 'center'}}>
          {this.props.counter}
        </Text>
        <Text style={{fontSize: 40, alignSelf: 'center'}}>
          {this.props.users}
        </Text>
        <Button title="Press me" onPress={this.props.increment}></Button>
        <Button title="Don't Press me" onPress={this.props.updateUser}></Button>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  counter: state.counter,
  users: state.users
})

export default connect(mapStateToProps, {increment: increment, updateUser: updateUser})(Counter)