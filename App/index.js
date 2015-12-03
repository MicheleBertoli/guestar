/**
 * Guestar
 * http://guestar.com
 */
 
'use strict';

import React from 'react-native';
import HomeStore from './stores/HomeStore';
import HomeActions from './actions/HomeActions';

import Home from './views/Home';
import Login from './views/Login';

const { 
  AppRegistry, 
  AsyncStorage,
  StatusBarIOS,
  ActivityIndicatorIOS,
  Component, 
  Dimensions,
  StyleSheet, 
  View 
} = React;

const {
  width, 
  height
} = Dimensions.get('window');

function _getStateFromStore() {
  return {
    isLogged: HomeStore.isLogged(),
    isLoading: HomeStore.isLoading()
  };
}

class Application extends Component {

  constructor() {
    super();
    this.state = _getStateFromStore();
    this._onChange = this._onChange.bind(this);  
  }

  componentDidMount() {

    HomeStore.addChangeListener(this._onChange);
    StatusBarIOS.setStyle('light-content');

    AsyncStorage.getItem('isLogged').then((isLogged) => {
      if(isLogged === 'y') {
        HomeActions.setLoading(true);
        setTimeout(() => {
          HomeActions.setLogged(true);     
        }, 2000);
      }
    }).done();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  componentWillUnmount() {
    HomeStore.removeChangeListener(this._onChange);      
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLogged ? <Home /> : <Login />}
        {this.state.isLoading ? this._renderLoading() : <View />}
      </View>
    );
  }  

  _renderLoading() {
    return (
      <View style={styles.loading}>
        <View style={styles.loadingContainer}>
          <ActivityIndicatorIOS 
            style={styles.loadingSpinner}
          />
        </View>
      </View>
    );
  }

  _onChange() {
    this.setState(_getStateFromStore());
  }

}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    position: 'absolute',
    top: height / 2,
    left: width / 2,
    marginTop: -40,
    marginLeft: -40,
    width: 80,
    height: 80,
    opacity: 0.9,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#222'
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  loadingSpinner: {
  }
});

AppRegistry.registerComponent('Application', () => Application);
