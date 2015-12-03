/**
 * Home Component
 */

'use strict';

import React from 'react-native';

import Menu from '../components/Menu';
import Welcome from './Welcome';
import Event from './Event';
import Settings from './Settings';

const { 
  Component, 
  StyleSheet,
  Dimensions,
  NavigatorIOS,
  ActivityIndicatorIOS,
  AsyncStorage,
  View,
  Text
} = React;

class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderMenu()}
      </View>
    );
  }

  _renderMenu() {
    return (
      <Menu 
        firstRoute={{ title: 'Guestar', component: Welcome }}
        secondRoute={{ title: 'News', component: Event }}
        thirdRoute={{ title: 'Evento', component: Event }}
        fourthRoute={{ title: 'Impostazioni', component: Settings }}
      />
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1
  }
});

export default Home;