import React from 'react';
import {
  Platform,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux'
import { Root, Container, Header, Item, Input, Icon, Button, Content } from 'native-base'
import ListingRow from '../components/ListingRow'

import { updateUserActionCreator } from '../actions/userActionCreators'
import { 
  getListingsActionCreator, 
  updateSearchInputActionCreator, 
  updateListingActionCreator
} from '../actions/homeActionCrerators'

import { getUser } from '../api/firebase'
import { objectToArray, reportInfo } from '../util';
class HomeScreen extends React.Component {
  static navigationOptions = {
    headerVisible: false,
    header: null,
  }

  componentWillMount() {
    // Fetch user to be used in the rest of the app
    getUser().then(user => {
      this.props.updateUser(user)
    }).catch(() => {
      //TODO EXIT APP
      reportInfo('An error occured. Please contact admin', 'danger')
    })

    // Fetch posts to be used within this page
    this.props.getListings()
  }

  handleSearchChange = q => {
    this.props.updateSearch(q)
  }

  updateList = () => {
    this.props.getListings(this.props.searchValue)
  }

  validate = () => {
    const q = this.props.searchValue
    if (q === '' || !q) {
      return true
    }
    else {
      return false
    }
  }

  _renderItem = ({item}) => {
    const onPress = () => {
      this.props.updateListing(item)
      this.props.navigation.navigate('Listing', {title: item.title})
    }
    return <ListingRow listing={item} onPress={onPress}/>
  }
  _keyExtractor = (item, index) => item.id

  render() {
    console.log(this.props.searchValue)
    return (
      <Root>
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input 
                placeholder="Search"
                value={this.props.searchValue}
                onChangeText={this.handleSearchChange}
                onSubmitEditing={() => this.author.focus() }
              />
            </Item>
            <Button transparent onPress={this.updateList} disabled={this.validate()}>
              <Text>Search</Text>
            </Button>
          </Header>
          <Content contentContainerStyle={styles.container}>
            <FlatList 
              data={objectToArray(this.props.listings)}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              ListEmptyComponent={<View style={{flex:1}} />}
            />
          </Content>
        </Container>
      </Root>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 3,
    paddingTop: 20,
    backgroundColor: '#c7c7d3',
  },
});

const mapStateToProps = state => ({
  user: state.user.updateUser,
  listings: state.home.getListings,
  searchValue: state.home.updateSearch
})

const mapDispatchToProps = {
  updateUser: updateUserActionCreator,
  getListings: getListingsActionCreator,
  updateSearch: updateSearchInputActionCreator,
  updateListing: updateListingActionCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

