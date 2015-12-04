/**
 * Home Component
 */

'use strict';

import React from 'react-native';
import HomeStore from '../stores/HomeStore';

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
      isLoading: HomeStore.isLoading()
    };
    this._onChange = this._onChange.bind(this); 
  }

  componentDidMount() {
    HomeStore.addChangeListener(this._onChange);

    AsyncStorage.getItem('isLogged').then((isLogged) => {
      this.setState({ isReady: true });
      if(isLogged === 'y') {
        this.setState({ isLogged: true });
      }
    }).done();
  }

  componentWillUnmount() {
    HomeStore.removeChangeListener(this._onChange);      
  }  

  render() {
    return (
      <View style={styles.container}>
        {this.state.isReady ? 
          this.state.isLogged ? this._renderMenu() : <Login />          
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

  _onChange() {
    this.setState({
      isLoading: HomeStore.isLoading()
    });
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