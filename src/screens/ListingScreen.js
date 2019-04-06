import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, ScrollView, Platform } from 'react-native'
import { Icon, Button } from 'native-base'
import ContactInfoOverlay from '../components/ContactInfoOverlay'

import { 
  getUserActionCreator,
  updateOverlayVisibilityActionCreator
} from '../actions/listingActionCreators'

import { 
  upperCaseFirstLetterInWords, 
  upperCaseFirstLetter, 
  reportInfo 
} from '../util'

class ListingSceen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    // Uncommend the next line to add title to header
    // headerTitle: navigation.getParam('title') || '',
    
  })

  componentWillMount() {
    this.props.getUser(this.props.listing.uid)
  }
  
  render() {
    console.log(this.props.state)
    const {
      title,
      author,
      location,
      type,
      price,
      descreption,
      imageUri,
    } = this.props.listing
    const {
      username,
      email,
      phoneNumber
    } = this.props.user.user
    if (this.props.user.error) reportInfo(this.props.user.error, 'danger')
    return (
      <ScrollView scrollEnabled={!this.props.isOverlayVisibile} style={styles.container}>
      <ContactInfoOverlay
        isVisible={this.props.isOverlayVisibile}
        onDismiss={this.props.updateOverlayVisibility}
        email={email}
        phoneNumber={phoneNumber}
      />
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.title.container}>
            <Text style={styles.title.text}>{upperCaseFirstLetterInWords(title)}</Text>
          </View>
          <View style={styles.author.container}>
            <Text style={styles.author.text}>{upperCaseFirstLetterInWords(author)}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.rows[0]}>
            <Image  
              style={styles.image}
              source={{uri: imageUri}}
              resizeMode="contain"
            />
          </View>
          <View style={styles.rows[1]}>
            <View style={pricingStyles.container}>
              <View style={pricingStyles.type.container(type)}>
            {type === 'sell' ? (
                <Text style={pricingStyles.type.text}>{price + " JD"}</Text>
              ) : ( 
                <Text style={pricingStyles.type.text}>{upperCaseFirstLetter(type)}</Text>
              )}
              </View> 
            </View>
          </View>
          <View style={styles.rows[2]}>
            <View style={styles.user.container}>
              <Button 
                iconRight 
                transparent 
                primary 
                onPress={() => this.props.updateOverlayVisibility(true)}
              >
                <Icon name="ios-person" style={styles.user.icon} />
                <Text style={styles.user.text.default}>
                  Contact&nbsp;
                  <Text style={styles.user.text.username}>
                    {username}
                  </Text>
                </Text>
              </Button>
            </View>
          </View>
          <View style={styles.rows[3]}>
            <View style={styles.location.container}>
              <Icon name="ios-pin" style={styles.location.icon} />
              <Text style={styles.location.text}>
                {location.full}
              </Text>
            </View>
          </View>
          <View style={styles.rows[4]}>
            <View style={styles.descreption.container}>
              <Text style={styles.descreption.text}>{descreption}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      </ScrollView>
    )
  }
}

const getBackgoundColor = type => {
  switch(type) {
    case 'free':
      return '#07b618'
    case 'trade':
      return '#fbc622'
    case 'sell':
      return '#ff7805'
  }
}

const styles = {
  container: {
    backgroundColor: '#c7c7d3'
  },
  header: {
    backgroundColor: '#47466f',
  },
  title: {
    container: {
      marginVertical: 12,
      marginHorizontal: 15,
    },
    text: {
      fontSize: 24,
      color: '#f9f7e2',
    }
  },
  author : {
    container: {
      marginBottom: 12,
      marginLeft: 22,
    },
    text: {
      fontSize: 20,
      fontStyle: 'italic',
      color: '#aba991',
    },
  },
  body: {
    
  },
  rows: [
    {
      paddingVertical: 1,
      borderBottomWidth: 0.4,
      borderBottomColor: '#4c4c4c', 
      alignItems: 'center',

    },
    {
      marginVertical: 15,
    },
    {
      marginVertical: 10,
      marginHorizontal: 20,
    },
    {
      marginTop: 5,
      marginBottom: 10,
      marginHorizontal: 20,
    },
    {
      marginTop: 20,
      marginHorizontal: 15,
      marginBottom: 100,
    },
  ],
  image: {
    minWidth: 220,
    maxWidth: 250,
    minHeight: 320,
    maxHeight: 350,
    marginHorizontal: 8,
    marginVertical: 3,
    borderRadius: Platform.OS === 'ios' ? 10 : 2,
  },
  user: {
    container: {
      marginHorizontal: 20,
    },
    icon: {
      fontSize: 28,
      color: 'black'
    },
    text: {
      default: {
        fontSize: 26,
        color: '#323232',
      },
      username: {
        fontSize: 26,
        color: '#000000',
        fontWeight: '500',
      },
    },
  },
  location: {
    container: {
      marginHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center'
    },
    icon: {
      fontSize: 30,
      color: 'black',
      marginRight: 20,
    },
    text: {
      fontSize: 23,
      color: '#191919',
      fontWeight: '500',
    }
  },
  descreption: {
    container: {
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderTopWidth: 0.5,
      borderTopColor: '#4c4c4c',
      borderBottomWidth: 0.5,
      borderBottomColor: '#4c4c4c',
    },
    text: {
      fontSize: 20,
      fontWeight: '400',
      color: 'black'
    },
  },
}

const pricingStyles = {
  container: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  type: {
    container: type => ({
      backgroundColor: getBackgoundColor(type),
      borderWidth: 0.6,
      borderColor:  '#7c7c7c',
      borderRadius: 1,
      paddingVertical: 3,
      paddingHorizontal: 10,
      marginBottom: 15,
    }),
    text: {
      fontSize: 23,
      fontWeight: '400',
      color: '#181716'
    },
  },
}

const mapStateToProps = state => ({
  state,
  listing: state.home.updateListing,
  user: state.listing.getUser,
  isOverlayVisibile: state.listing.updateOverlayVisibility
})

const mapDispatchToProps = {
  getUser: getUserActionCreator,
  updateOverlayVisibility: updateOverlayVisibilityActionCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingSceen)