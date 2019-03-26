import React from 'react'
import { View, Text, StyleSheet, Platform, Linking, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { Container, Content, Icon } from 'native-base'
import Overlay from '../components/Overlay'

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#c7c7d3',
      shadowColor: 'rgba(0,0,0, .4)',
      shadowOffset: { height: 1, width: 3 },
      shadowOpacity: 1,
      shadowRadius: 3,
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

  state = {
    visible: false
  }

  onIconPress = type => {
    if (Platform.OS === 'ios' && type === 'email') {
      this.setState({ visible: true })
      return
    }
    let url = ''
    switch(type) {
      case 'email': url = 'mailto:alshboolmoh@gmail.com'; break;
      case 'github': url = 'https://github.com/Minter27'; break;
      case 'facebook': url = 'https://www.facebook.com/mohammadalshbol'; break;
      case 'twitter': url = 'https://twitter.com/mohshbool'; break;
    }
    if (Linking.canOpenURL(url)) Linking.openURL(url)
  }

  render() {
    const TouchableComponent = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback
    return (
      <Container>
        <Content style={styles.container}>
          <Overlay 
          isVisible={this.state.visible} 
          onBackdropPress={() => this.setState({ visible: false })}
          overlayStyle={styles.overlayStyle}
          containerStyle={styles.containerStyle}
        >
          <Text style={styles.emailText}>alshboolmoh@gmail.com</Text>
          </Overlay>
          <View style={styles.aboutDefaultCotainer}>
            <Text style={styles.aboutDefaultText}>
              About The Developer
            </Text>
          </View>
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Suspendisse malesuada ante non libero feugiat porta. Nulla eu fringilla risus. 
              Etiam vitae condimentum magna. Vestibulum consectetur vestibulum ex, ut ultrices 
              lacus blandit at. Mauris pulvinar hendrerit leo, eget congue nisi sagittis non. 
              Suspendisse ex sapien, placerat at libero vel, lobortis scelerisque mi. Etiam nec purus sit amet 
              felis porttitor accumsan varius eu eros. Vestibulum egestas ultrices metus, in sollicitudin est 
              porta ornare. Sed tempor augue mi, rutrum viverra turpis mattis vel.
            </Text>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableComponent activeOpacity={0} onPress={() => this.onIconPress('email')} style={{color: '#47466f'}}>
              <Icon name="mail" styles={styles.icon} />
            </TouchableComponent>
            <TouchableComponent activeOpacity={0} onPress={() => this.onIconPress('github')}>
              <Icon name="logo-github" styles={styles.icon}/>
            </TouchableComponent>
            <TouchableComponent activeOpacity={0} onPress={() => this.onIconPress('facebook')}>
              <Icon name="logo-facebook" styles={styles.icon} />
            </TouchableComponent>
            <TouchableComponent activeOpacity={0} onPress={() => this.onIconPress('twitter')}>
              <Icon name="logo-twitter" styles={styles.icon} />
            </TouchableComponent>
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Theme Designer </Text>
            <TouchableComponent activeOpacity={0} onPress={() => Linking.openURL('https://www.facebook.com/maenyasser')}>
              <Icon name="logo-facebook" styles={styles.footerIcon} />
            </TouchableComponent>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c7c7d3',
  },
  aboutDefaultCotainer: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  aboutDefaultText: {
    fontSize: 24,
    fontFamily: 'Courier',
    fontWeight: '500',
    color: 'black',
  },
  aboutContainer: {
    paddingHorizontal: 27,
    paddingBottom: 20,
  },
  aboutText: {
    fontSize: 22,
    fontWeight: '400',
    fontFamily: 'Times',
    fontStyle: 'italic',
    color: 'black'
  },
  overlayStyle: {
    marginVertical: 350,
  },
  containerStyle: {
    backgroundColor: '#47466f',
    borderColor: '#c7c7d3',
    borderWidth: 3,
    borderRadius: 15,
  },
  emailText: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Times',
    color: '#c7c7d3'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30
  },
  icon: {
    fontSize: 28,
  },
  footerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Courier',
    paddingRight: 20,
    paddingTop: 2,
    color: 'black',
  },
  footerIcon: {
    fontSize: 24,
  }
})