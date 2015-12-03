/**
 * Home Component
 */

'use strict';

import React from 'react-native';

import Menu from '../components/Menu';
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';

import Login from './Login';
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

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = _getStateFromStore();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.addChangeListener(this._onChange);

    AsyncStorage.getItem('isLogged').then((isLogged) => {
      if(isLogged === 'y')
        setTimeout(() => {
          HomeActions.setLogged(true);
        }, 1);
      else
        setTimeout(() => {
          HomeActions.setLogged(false);
        }, 1);
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
        {(this.state.isLogged) ? this._renderMenu() : <Login />}
        {(this.state.isLoading) ? this._renderLoading() : <View />} 
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

  _renderMenu() {
    return (
      <View style={styles.container}>
        <Menu 
          firstRoute={{ title: 'Guestar', component: Welcome }}
          secondRoute={{ title: 'News', component: Event }}
          thirdRoute={{ title: 'Evento', component: Event }}
          fourthRoute={{ title: 'Impostazioni', component: Settings }}
        />
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
  header: {
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

export default Home;