/**
 * Home Component
 */

'use strict';

import React from 'react-native';

import HomeStore from '../stores/HomeStore';
import LoginActions from '../actions/LoginActions';

import Menu from '../components/Menu';
import Login from './Login';
import Welcome from './Welcome';
import Event from './Event';
import Settings from './Settings';

const { 
  AsyncStorage,
  ActivityIndicatorIOS,
  Component, 
  Dimensions,
  StyleSheet, 
  Text,
  View 
} = React;

const {
  width, 
  height
} = Dimensions.get('window');

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isLogged: false,
      user: HomeStore.getUser(),
      isLoading: HomeStore.isLoading()
    };
    this._onChange = this._onChange.bind(this); 
  }

  componentDidMount() {

    HomeStore.addChangeListener(this._onChange);

    AsyncStorage.getItem('accessToken').then((accessToken) => {
      this.setState({ isReady: true });
      if(accessToken && accessToken !== '') {
        LoginActions.loginUser(accessToken);        
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
        {this.state.isReady ?      
          (this.state.user) ?
            <Menu
              firstRoute={{ title: 'Home', component: Welcome }}
              secondRoute={{ title: 'News', component: Event }}
              thirdRoute={{ title: 'Evento', component: Event }}
              fourthRoute={{ title: 'Impostazioni', component: Settings }}
            />
          :    
            <Login />
        : 
          <Text>Splashscreen</Text>
        }
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

    this.setState({
      isLoading: HomeStore.isLoading(),
      user: HomeStore.getUser()
    });

    if(this.state.user) {
      AsyncStorage.setItem(
        'accessToken',
        this.state.user.facebook.accessToken
      );
    }

  }
}

const styles = StyleSheet.create({
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

export default Home;