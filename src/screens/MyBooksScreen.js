import React from 'react'
import { Alert, View, FlatList, StyleSheet } from 'react-native'
import { Container, Content, Spinner } from 'native-base'
import { connect } from 'react-redux'
import MyListingRow from '../components/MyListingRow'

import { getMyListingsActionCreator } from '../actions/myListingsActionCreators'
import { deleteListing as deleteListingById } from '../api/firebase'
import { objectToArray } from '../util'
class MyBooksScreen extends React.Component {
  componentWillMount() {
    this.props.getListings()
  }
  getBookById = id => {
    const { books } = this.props
    for (let book of objectToArray(books)) {
      console.log(book)
      if (book.id === id) {
        return book
      }
    }
  }
  deleteListing = id => {
    const { title } = this.getBookById(id)
    Alert.alert(
      'Delete',
      `Are you sure you want to delete ${title}`,
      [
        { text: 'Dismiss' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteListingById(id).then(() => this.forceUpdate())
          }
        }
      ]
    )
  }

  _renderItem = ({ item }) => (
    <MyListingRow item={{...item, onDelete: this.deleteListing}} />
  )
  _keyExtractor = (item, index) => item.id
  _ListEmptyComponent = (
    <View style={styles.ListEmptyComponent}>
      <Spinner size="large" color="#47466f" />
    </View>
  )

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.container} style={{backgroundColor: '#47466f'}}>
          <FlatList 
            data={objectToArray(this.props.books)}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            ListEmptyComponent={this._ListEmptyComponent}
          />
        </Content>
      </Container>
    )
  }
} 

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  ListEmptyComponent: {
    paddingTop: 100,
  },
})

const mapStateToProps = state => ({
  books: state.myListings.getMyListings
})

const mapDispatchToProps = {
  getListings: getMyListingsActionCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBooksScreen)