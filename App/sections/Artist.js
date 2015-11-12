/**
 * Artist Component
 */

'use strict';

import React from 'react-native';
import ArtistStore from '../stores/ArtistStore';
import ArtistActions from '../actions/ArtistActions';
import ArtistAPI from '../utils/ArtistAPI';

let { Component, StyleSheet, Text, Image, View, ScrollView } = React;

function _getStateFromStore() {
  return {
    artist: ArtistStore.getData()
  };
}

class Artist extends Component {
    
  constructor(props) {
    super(props);
    this.state = _getStateFromStore();
    this._onChange = this._onChange.bind(this);  
  }

  componentWillMount() {
    ArtistStore.addChangeListener(this._onChange);
    this._loadArtistInfo();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.artist !== this.state.artist;
  }

  componentWillUnmount() {
    ArtistStore.removeChangeListener(this._onChange);    
  }

  render() {
    return (
      <ScrollView style={styles.container} contentInset={{bottom: 64}}>
        <Image
          style={styles.image}
          source={{uri: 'http://guestar.com/a/artists/10069/image'}}
          resizeMode={'cover'}
        />

        <View style={styles.details}>
          <Text style={[styles.text, styles.title]}>
            Componenti:
            <Text style={styles.text}>
              {this.state.artist.members}
            </Text>
          </Text>  

          <Text style={[styles.text, styles.title]}>
            Crew:
            <Text style={styles.text}>
              {this.state.artist.crew}
            </Text>
          </Text>  

          <Text style={[styles.text, styles.title]}>
            Strumenti:
            <Text style={styles.text}>
              Si
            </Text>
          </Text>  

          <Text style={[styles.text, styles.title]}>
            Distanza:
            <Text style={styles.text}>
              {this.state.artist.distance}
            </Text>
          </Text>

          <Text style={[styles.text, styles.title]}>
            Vitto:
            <Text style={styles.text}>
              {this.state.artist.dinner}
            </Text>
          </Text>  

          <Text style={[styles.text, styles.title]}>
            Alloggio:
            <Text style={styles.text}>
              {this.state.artist.overnight}
            </Text>
          </Text>  
        </View>

        <View style={styles.bio}>
          <Text style={styles.text}>
            {this.state.artist.bio}
          </Text>
        </View>
      </ScrollView>
    );
  }

  _onChange() {
    this.setState(_getStateFromStore());
  }

  _loadArtistInfo() {
    ArtistAPI.getData(10069);
  }

}

let styles = StyleSheet.create({
  container: {},
  details: {
    margin: 20,
    marginBottom: 0
  },
  bio: {
    margin: 20
  },
  title: {
    fontWeight: 'bold'
  },  
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24
  },
  image: {
    height: 200,
    backgroundColor: '#DDD'
  }

});

export default Artist;
