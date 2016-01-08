/**
 * More Component
 */

'use strict';

import React from 'react-native';

const { 
  Component, 
  StyleSheet, 
  View, 
  Text
} = React;

class More extends Component {
    
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>About</Text>         
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

export default More;