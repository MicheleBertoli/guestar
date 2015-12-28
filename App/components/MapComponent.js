/**
 * Map Component
 */

'use strict';

import React from 'react-native';

const { 
  Component, 
  StyleSheet, 
  MapView, 
  View 
} = React;

class MapComponent extends Component {

  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <MapView
        style={styles.map}
        region={this.props.region}
        showsUserLocation={true}
        annotations={this.props.annotations}
      />
    );
  }

}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: 200
  }
});

export default MapComponent;
