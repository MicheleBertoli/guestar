'use strict';

import React from 'react-native';

let { 
  Component, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Text, 
  View 
} = React;

class ImageBox extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Image 
            style={styles.image}
            source={{ uri: this.props.image }}
          />
          <Text
            style={styles.name}>
            {this.props.name}
          </Text>
          <Text
            style={styles.genre}>
            {this.props.genre}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
} 

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 150
  },
  name: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    color: 'white'
  }
});

export default ImageBox;