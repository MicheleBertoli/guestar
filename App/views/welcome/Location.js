/**
 * Location Component
 */

'use strict';

import React from 'react-native';

const { 
  Component, 
  StyleSheet, 
  Text, 
  ScrollView 
} = React;

class Location extends Component {
    
  constructor(props) {
    super(props); 
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
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24
  }
});

export default Location;
