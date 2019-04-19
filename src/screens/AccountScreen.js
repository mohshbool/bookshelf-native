import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { Container, Content, Button as NButton, Card, CardItem, Icon, Right } from 'native-base'
import Button from '../components/Button'

import { signOut } from '../api/firebase'
class AccountScreen extends React.Component {
  static navigationOptions = {
    headerVisible: false,
    header: null,
  }

  componentWillMount() {
    const onFocus = () => {
      if (this.props.navigation.getParam('shouldComponentUpdate')) this.forceUpdate()
    }
    this.listener = this.props.navigation.addListener('willFocus', onFocus)
  }

  componentWillUnmount() {
    this.listener.remove()
  }

  navigateToMyBooks = () => {
    this.props.navigation.navigate('MyBooks')
  }

  navigateToPhone = () => {
    this.props.navigation.navigate('VerifyPhoneNumber')
  }

  signOut = () => {
    signOut()
    this.props.navigation.navigate('SignedOut')
  }

  render() {
    const {
      username,
      email,
      phoneNumber,
      isPhoneVerified
    } = this.props.user
    const shieldIconName  = isPhoneVerified ? "shield" : "shield-off"
    return(
      <Container>
        <Content contentContainerStyle={styles.container} style={{backgroundColor: '#c7c7d3'}}>
          <Button 
            title="My Books"
            containerStyle={styles.myBooksButtonContainer}
            icon={<Icon 
              name="book" 
              type="FontAwesome"
              style={styles.buttonIcon} 
            />}
            buttonTitleStyle={styles.buttonText}
            onPress={this.navigateToMyBooks}
          />
          <Card style={styles.card}>
            <CardItem style={styles.itemContainer}>
              <Icon name="ios-person" style={styles.itemIcon}/>
              <Text style={styles.itemText}>{username}</Text>
            </CardItem>
            <CardItem style={styles.itemContainer}>
              <Icon name="ios-mail" style={styles.itemIcon}/>
              <Text style={StyleSheet.flatten([styles.itemText, {fontStyle: 'italic'}])}>{email}</Text>
            </CardItem>
            <CardItem style={{...styles.itemContainer, marginVertical: 10}}>
              <Icon name="ios-call" style={styles.itemIcon}/>
              <Text style={styles.itemText}>{phoneNumber}</Text>
              <Right>
                <NButton transparent onPress={this.navigateToPhone} disabled={isPhoneVerified}>
                  <Icon type="Feather" name={shieldIconName} style={styles.shield} />
                </NButton>
              </Right>
            </CardItem>
           </Card>
           <View style={styles.buttonsContainer}>
            <Button 
              title="Contact Us"
              icon={<Icon 
                type="MaterialIcons" 
                name="contact-mail"
                style={styles.buttonIcon} 
              />}
              containerStyle={styles.buttonContainer}
              buttonTitleStyle={styles.buttonText}
              onPress={() => this.props.navigation.navigate('About')}
            />
            <Button 
              title="Log Out"
              icon={<Icon 
                name="ios-log-out" 
                style={styles.buttonIcon} 
              />}
              buttonTitleStyle={styles.buttonText}
              onPress={this.signOut}
            />
           </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#c7c7d3'
  },
  myBooksButtonContainer: {
    padding: 20,
  },
  card: {
    marginVertical: 20,
    backgroundColor: '#47466f',
    borderRadius: 10,
  },
  itemContainer: {
    marginVertical: 15,
    borderRadius: 5,
    backgroundColor: '#47466f'
  },
  itemIcon: {
    marginHorizontal: 10,
    marginTop: 5,
    fontSize: 28,
    color: '#9392ba'
  },
  itemText : {
    fontSize: 26,
    fontWeight: '400',
    color: '#c7c7d3',
  },
  shield: {
    fontSize: 26,
    marginBottom: 3,
    color: '#a3a2c4'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 100,
    paddingHorizontal: 6,
  },
  buttonContainer: {
    marginRight: 30,
  },
  buttonIcon: {
    paddingLeft: 4,
    paddingRight: 2,
    fontSize: 25,
    color: '#c7c7d3',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '400',
    paddingHorizontal: 5,
  }
})

const mapStateToProps = state => ({
  user: state.user.updateUser,
})

export default connect(mapStateToProps)(AccountScreen)