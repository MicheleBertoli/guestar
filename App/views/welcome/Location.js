/**
 * Location Component
 */

'use strict';

import React from 'react-native';
//import ArtistStore from '../../stores/ArtistStore';

let { 
  Component, 
  StyleSheet, 
  Text, 
  View,
  ScrollView 
} = React;

// function _getStateFromStore() {
//   return {
//     artist: ArtistStore.getData()
//   };
// }

class Location extends Component {
    
  constructor(props) {
    super(props);
    //this.state = _getStateFromStore();
    //this._onChange = this._onChange.bind(this);  
  }

  componentDidMount() {
    //ArtistStore.addChangeListener(this._onChange);    
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.artist !== this.state.artist;
  }

  componentWillUnmount() {
    //ArtistStore.removeChangeListener(this._onChange);    
  }

  render() {

    return (
      <ScrollView style={styles.container} contentInset={{bottom: 64}}>
        <Text style={styles.text}>
          Location
        </Text>
        <Text style={styles.text}>
          {this.props.artist.name}
        </Text>
      </ScrollView>
    );
  }

  // _onChange() {
  //   this.setState(_getStateFromStore());
  // }

}

let styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24
  }
});

export default Location;
