/**
 * Artist Component
 */

'use strict';

import React from 'react-native';
import Location from './Location';

const { 
  Component, 
  StyleSheet, 
  Text, 
  Image, 
  View,
  TouchableOpacity,
  ScrollView 
} = React;

class Artist extends Component {
    
  constructor(props) {
    super(props);
    this.state = { 
      artist: this.props.artist 
    };
  }

  render() {

    const baseURL = 'https://guestar.firebaseapp.com/images/';

    return (
      <ScrollView style={styles.container} contentInset={{bottom: 64}}>
        <Image
          style={styles.image}
          source={{ uri: baseURL + this.state.artist.imageHorizontal }}
          resizeMode={'cover'}
        />

        <TouchableOpacity
          onPress={() => this._goToLocation()}>
          <Text
            style={styles.button}>
            Invita
          </Text>          
        </TouchableOpacity>

        <View style={styles.details}>
          <Text style={[styles.text, styles.title]}>
            Componenti:
            <Text style={styles.text}>
              {this.state.artist.members}
            </Text>
          </Text>  

          <Text style={[styles.text, styles.title]}>
            Crew:
            <Text style={styles.text}>
              {this.state.artist.crew}
            </Text>
          </Text>  

          <Text style={[styles.text, styles.title]}>
            Strumenti:
            <Text style={styles.text}>
              Si
            </Text>
          </Text>  

          <Text style={[styles.text, styles.title]}>
            Distanza:
            <Text style={styles.text}>
              {this.state.artist.distance}
            </Text>
          </Text>

          <Text style={[styles.text, styles.title]}>
            Vitto:
            <Text style={styles.text}>
              {this.state.artist.dinner}
            </Text>
          </Text>  

          <Text style={[styles.text, styles.title]}>
            Alloggio:
            <Text style={styles.text}>
              {this.state.artist.overnight}
            </Text>
          </Text>  
        </View>

        <View style={styles.bio}>
          <Text style={styles.text}>
            {this.state.artist.bio}
          </Text>
        </View>
      </ScrollView>      
    );
  }

  _goToLocation() {
    this.props.navigator.push({
      title: 'Seleziona la location',
      component: Location,
      passProps: { artist: this.state.artist }
    });
  }
}

const styles = StyleSheet.create({
  container: {},
  button: {
    alignSelf: 'center',
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: '#ED253C',
    color: 'white',
    padding: 10,
    borderRadius: 5    
  },
  details: {
    margin: 20,
    marginBottom: 0
  },
  bio: {
    margin: 20
  },
  title: {
    fontWeight: 'bold'
  },  
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24
  },
  image: {
    height: 200,
    backgroundColor: '#DDD'
  }

});

export default Artist;
