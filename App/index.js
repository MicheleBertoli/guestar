/**
 * Guestar
 * http://guestar.com
 */
 
'use strict';

import React from 'react-native';
let { AppRegistry, StyleSheet, View } = React;

import Menu from './components/Menu';

class Application extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Menu />
      </View>
    );
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('Application', () => Application);
