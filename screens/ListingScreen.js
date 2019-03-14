import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, ScrollView } from 'react-native'
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
    headerTitle: navigation.getParam('title') || '',
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
      <ScrollView scrollEnabled={!this.props.isOverlayVisibile}>
      <ContactInfoOverlay
        isVisible={this.props.isOverlayVisibile}
        onDismiss={this.props.updateOverlayVisibility}
        email={email}
        phoneNumber={phoneNumber}
      />
      <ScrollView style={styles.container}>
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
                <Text style={pricingStyles.type.text}>{upperCaseFirstLetter(type)}</Text>
              </View>
              {type === 'sell' && (
                <View style={pricingStyles.price.container}>
                  <Text style={pricingStyles.price.text}>{price}</Text>
                </View>
              )}
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
      return 'green'
    case 'trade':
      return 'yellow'
    case 'sell':
      return 'orange'
  }
}

const styles = {
  container: {
    
  },
  header: {
    backgroundColor: '#d8d8d8',
    borderBottomWidth: 0.7,
    borderBottomColor: '#8c8c8c',
  },
  title: {
    container: {
      marginVertical: 12,
      marginHorizontal: 15,
    },
    text: {
      fontSize: 26,
      color: 'black',
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
    },
  },
  body: {
    
  },
  rows: [
    {
      marginVertical: 5,
      borderBottomWidth: 0.4,
      borderBottomColor: '#4c4c4c', 
      alignItems: 'center',

    },
    {
      marginTop: 20,
      marginBottom: 15,
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
    width: 225,
    height: 340,
    marginHorizontal: 8,
    marginVertical: 3,
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
      fontSize: 22,
      fontWeight: '400'
    },
  },
}

const pricingStyles = {
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 15,
  },
  type: {
    container: type => ({
      backgroundColor: getBackgoundColor(type),
      borderWidth: 0.6,
      borderColor:  '#7c7c7c',
      paddingVertical: 3,
      paddingHorizontal: 10,
      marginRight: type === 'sell' ? 5 : 0,
      marginBottom: 15,
    }),
    text: {
      fontSize: 26,
      fontWeight: '400',
    },
  },
  price: {
    container: {
      marginLeft: 5,
      marginBottom: 10,
    },
    text: {
      fontSize: 34,
      fontWeight: '300',
    },
  }
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