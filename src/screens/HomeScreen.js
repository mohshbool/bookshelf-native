import React from 'react';
import {
  Platform,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux'
import { Root, Container, Header, Item, Input, Icon, Spinner, Content } from 'native-base'
import ListingRow from '../components/ListingRow'

import { updateUserActionCreator } from '../actions/userActionCreators'
import { 
  getListingsActionCreator, 
  updateSearchInputActionCreator, 
  updateListingActionCreator,
  emptyListingsActionCreator,
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
    if (this.delay) clearTimeout(this.delay)
    setTimeout(this.props.emptyListings, 1000)
    this.delay = setTimeout(() => {
      this.props.getListings(q)
    }, 1500)
  }

  _renderItem = ({item}) => {
    const onPress = () => {
      this.props.updateListing(item)
      this.props.navigation.navigate('Listing', {title: item.title})
    }
    return <ListingRow listing={item} onPress={onPress}/>
  }
  _keyExtractor = (item, index) => item.id
  _ListEmptyComponent = (
    <View style={styles.ListEmptyComponent}>
      <Spinner size="large" color="#47466f" />
    </View>
  )

  render() {
    return (
      <Root>
        <Container>
          <Header searchBar rounded style={styles.header}>
            <Item style={{backgroundColor: '#c7c7d3'}}>
              <Icon name="ios-search" />
              <Input 
                placeholder="Search"
                value={this.props.searchValue}
                onChangeText={this.handleSearchChange}
              />
              {!this.props.listings[Object.keys(this.props.listings)[0]].id && (
                <Spinner style={styles.loading} size="small" color="#47466f"/>
              )}
            </Item>
          </Header>
          <Content 
            contentContainerStyle={styles.container} 
            style={{backgroundColor: '#c7c7d3'}}
          >
            <FlatList 
              data={objectToArray(this.props.listings)}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              ListEmptyComponent={this._ListEmptyComponent}
            />
          </Content>
        </Container>
      </Root>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#47466f',
  },
  container: {
    paddingHorizontal: 3,
    paddingTop: 30,
  },
  loading: {
    marginRight: 10,
    marginTop: 2,
  },
  ListEmptyComponent: {
    paddingTop: 100,
  }
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
  emptyListings: emptyListingsActionCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)