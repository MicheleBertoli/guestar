/**
 * Locations Component
 */

'use strict';

import React from 'react-native';
import NewEvent from './NewEvent';

import LocationStore from '../../stores/LocationStore';
import LocationActions from '../../actions/LocationActions';

const { 
  Component, 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  View,
  Image,
  ListView 
} = React;

class Locations extends Component {
    
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      locations: dataSource.cloneWithRows(LocationStore.getLocations())
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    LocationStore.addChangeListener(this._onChange);
    LocationActions.getLocations(this.props.user.uid);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.locations !== this.state.locations;
  }

  componentWillUnmount() {
    LocationActions.removeLocationsBinding();
    LocationStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <ListView
        dataSource={this.state.locations}
        renderRow={(rowData) => this._getLocationsInfo(rowData)}
        contentInset={{ bottom: 112 }}  
      />
    );
  }

  _getLocationsInfo(location) {  
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._goToNewEvent(location)}>
          <Image 
            style={styles.image}
            source={{ uri: location.image }}
          />
          <View style={styles.textContainer}>
            <Text
              style={[styles.text, styles.name]}>
              {location.name}
            </Text>
            <Text
              style={[styles.text, styles.address]}>
              {location.address}
            </Text>
          </View>
        </TouchableOpacity>
      </View>     
    );
  }

  _goToNewEvent(location) {
    this.props.navigator.push({
      title: 'Nuovo evento',
      component: NewEvent,
      passProps: { 
        user: this.props.user,
        artist: this.props.artist,
        location: location
      }
    });
  }
  
  _onChange() {
    this.setState({
      locations: this.state.locations.cloneWithRows(
        LocationStore.getLocations()
      )
    });
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24
  },
  image: {
    height: 150
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  text: {
    fontSize: 16,
    color: '#fff',
    shadowColor: '#666',
    shadowRadius: 3,
    shadowOpacity: 100,
    shadowOffset: { width: 1, height : 1}
  },
  name: {
    fontSize: 30
  },
  address: {
    fontSize: 16
  }
});

export default Locations;
