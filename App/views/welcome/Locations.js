/**
 * Locations Component
 */

'use strict';

import React from 'react-native';
import HomeStore from '../../stores/HomeStore';
import NewLocation from './NewLocation';

const { 
  Component, 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  View,
  ScrollView 
} = React;

class Locations extends Component {
    
  constructor(props) {
    super(props); 
    this.state = {
      user: HomeStore.getUser()
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.addChangeListener(this._onChange);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  componentWillUnmount() {
    HomeStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <ScrollView 
        style={styles.container}
        contentInset={{bottom: 64}}>
        <View style={styles.details}>
          <Text style={styles.text}>
            Location
          </Text>
          <TouchableOpacity
            onPress={() => this._newLocation()}>
            <Text
              style={styles.button}>
              Crea una nuova location
            </Text>          
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  _newLocation() {
    this.props.navigator.push({
      title: 'Nuova location',
      component: NewLocation,
      passProps: { 
        artist: this.props.artist,
        user: this.state.user
      }
    });
  }

  _onChange() {
    this.setState({
      user: HomeStore.getUser()
    });
  }
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24
  },
  details: {
    margin: 20,
    marginBottom: 0
  },
  button: {
    flex: 1,
    flexDirection: 'row',    
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#ED253C',
    color: 'white',
    padding: 10,
    marginTop: 20,
    borderRadius: 5
  }
});

export default Locations;
