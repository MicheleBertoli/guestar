/**
 * Guestar
 * http://guestar.com
 */
 
'use strict';

import React from 'react-native';
import Home from './views/Home';

const { 
  AppRegistry, 
  Component,
  StatusBarIOS,
  StyleSheet,
  View 
} = React;

class Application extends Component {

  constructor() {
    super(); 
    StatusBarIOS.setStyle('light-content');    
  }

  render() {
    return (
      <View style={styles.container}>
        <Home />
      </View>
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('Application', () => Application);
