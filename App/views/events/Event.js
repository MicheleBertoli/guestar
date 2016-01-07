/**
 * Event Component
 */

'use strict';

import React from 'react-native';

const { 
  Component, 
  StyleSheet, 
  View, 
  Text
} = React;

class Event extends Component {
    
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Event</Text>         
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

export default Event;