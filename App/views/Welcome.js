/**
 * Welcome Component
 */

'use strict';

import React from 'react-native';
import WelcomeStore from '../stores/WelcomeStore';
import WelcomeActions from '../actions/WelcomeActions';

import Artist from './welcome/Artist';

const { 
  Component, 
  StyleSheet, 
  Text, 
  ListView,
  Image,
  TouchableOpacity,
  ActivityIndicatorIOS,
  View,
  ScrollView
} = React;

class Welcome extends Component {
    
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      artists: dataSource.cloneWithRows(WelcomeStore.getArtists())
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    WelcomeStore.addChangeListener(this._onChange);
    setTimeout(() => WelcomeActions.getArtists());
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.artists !== this.state.artists;
  }

  componentWillUnmount() {
    WelcomeStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <ListView
        dataSource={this.state.artists}
        renderRow={(rowData) => this._getArtistInfo(rowData)}
        contentInset={{ bottom: 64 }}  
      />
    );
  }

  _getArtistInfo(artist) {

    const baseURL = 'https://guestar.firebaseapp.com/images/';
  
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._goToArtist(artist)}>
          <Image 
            style={styles.image}
            source={{ uri: baseURL + artist.imageHorizontal }}
          />
          <View style={styles.textContainer}>
            <Text
              style={[styles.text, styles.name]}>
              {artist.name}
            </Text>
            <Text
              style={[styles.text, styles.genre]}>
              {artist.genres.join(', ')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>     
    );
  }

  _goToArtist(artist) {
    this.props.navigator.push({
      title: artist.name,
      component: Artist,
      backButtonTitle: 'Indietro',      
      passProps: { artist: artist }
    });
  }  
  
  _onChange() {
    this.setState({
      artists: this.state.artists.cloneWithRows(
        WelcomeStore.getArtists()
      )
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 150
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  text: {
    fontSize: 16,
    color: '#fff',
    shadowColor: '#666',
    shadowRadius: 3,
    shadowOpacity: 100,
    shadowOffset: { width: 1, height : 1}
  },
  name: {
    fontSize: 30
  },
  genre: {
    fontSize: 16
  }
});

export default Welcome;