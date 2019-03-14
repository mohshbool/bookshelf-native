import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { Container, Content, Button, Card, CardItem, Icon, Right } from 'native-base'
import { signOut } from '../api/firebase';

class AccountScreen extends React.Component {
  static navigationOptions = {
    headerVisible: false,
    header: null,
  }

  navigateToPhone = () => {
    this.props.navigation.navigate('VerifyPhoneNumber')
  }

  render() {
    const {
      username,
      email,
      phoneNumber,
      isPhoneVerified
    } = this.props.user
    const shieldIconName  = isPhoneVerified ? "shield-check" : "shield-off"
    return(
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Card style={styles.card}>
            <CardItem style={styles.itemContainer}>
              <Icon name="ios-person" style={styles.itemIcon}/>
              <Text style={styles.itemText}>{username}</Text>
            </CardItem>
            <CardItem>
              <Icon name="ios-mail" style={styles.itemIcon}/>
              <Text style={StyleSheet.flatten([styles.itemText, {fontStyle: 'italic'}])}>{email}</Text>
            </CardItem>
            <CardItem style={{marginVertical: 10}}>
              <Icon name="ios-call" style={styles.itemIcon}/>
              <Text style={styles.itemText}>{phoneNumber}</Text>
              <Right>
                <Button transparent onPress={this.navigateToPhone} disabled={isPhoneVerified}>
                  <Icon type="Feather" name={shieldIconName} style={styles.shield} />
                </Button>
              </Right>
            </CardItem>
           </Card>
           <View style={styles.buttonsContainer}>
            <Button iconRight block style={styles.buttonContainer}>
            <Icon type="MaterialIcons" name="contact-mail" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>
                Contact Us
              </Text>
            </Button>
            <Button iconRight block>
              <Icon name="ios-log-out" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>
                Log Out
              </Text>
            </Button>
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
  },
  card: {
    marginVertical: 20,
  },
  itemContainer: {
    marginVertical: 15,
  },
  itemIcon: {
    fontSize: 28,
    marginHorizontal: 10,
    marginTop: 5,
  },
  itemText : {
    fontSize: 26,
    fontWeight: '400',
  },
  shield: {
    fontSize: 26,
    marginBottom: 3,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 100,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginRight: 20,
  },
  buttonIcon: {
    fontSize: 25,
    paddingLeft: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '400',
    paddingRight: 10,
  }

})

const mapStateToProps = state => ({
  user: state.user.updateUser,
})

export default connect(mapStateToProps)(AccountScreen)