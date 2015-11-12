'use strict';

import React from 'react-native';

let { Component, StyleSheet, TouchableHighlight, Image, Text, View } = React;

class BackButton extends Component {
  render() {
    return (
      <Image source={require('image!back_button')} style={styles.backButton} />
    )
  }
} 

let styles = StyleSheet.create({
  backButton: {
    width: 10,
    height: 17,
    marginLeft: 10,
    marginTop: 3,
    marginRight: 10
  }
});

export default BackButton;