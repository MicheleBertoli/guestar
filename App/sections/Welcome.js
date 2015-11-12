/**
 * Welcome Component
 */

'use strict';

import React from 'react-native';
import WelcomeStore from '../stores/WelcomeStore';
import WelcomeActions from '../actions/WelcomeActions';
import WelcomeAPI from '../utils/WelcomeAPI';

import Artist from '../sections/Artist';

let { Component, StyleSheet, Text, View, TouchableOpacity } = React;

function _getStateFromStore() {
  return {
    message: WelcomeStore.getMessage()
  };
}

class Welcome extends Component {
    
  constructor(props) {
    super(props);
    this.state = _getStateFromStore();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    WelcomeStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    WelcomeStore.removeChangeListener(this._onChange);
  }

  goToArtist() {
    this.props.navigator.push({
      title: "Artist",
      component: Artist
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={this._changeMessageStore}
          underlayColor="transparent">
          <Text style={styles.button}>Change Message in Store</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{alignSelf: 'center'}}
          onPress={() => this.goToArtist()}
          underlayColor="transparent">
          <Text style={styles.button}>Go to Artist</Text>
        </TouchableOpacity>

        <Text style={styles.welcome}>
          {this.state.message}
        </Text>

      </View>
    );
  }

  _onChange() {
    this.setState(_getStateFromStore());
  }

  _changeMessageStore() {
    WelcomeActions.setWelcomeMessage('Store message Changed!');
  }

  _loadWelcomeInfo() {
    WelcomeAPI.getData();
  }

}

let styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: '#ED253C',
    color: 'white',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15
  }
});

export default Welcome;