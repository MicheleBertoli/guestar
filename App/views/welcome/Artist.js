/**
 * Artist Component
 */

'use strict';

import React from 'react-native';
import Locations from './Locations';

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

        <View style={styles.details}>

          <TouchableOpacity
            onPress={() => this._goToLocation()}>
            <Text
              style={styles.button}>
              Invita al tuo evento
            </Text>          
          </TouchableOpacity>

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

          <Text style={[styles.text, styles.bio]}>
            {this.state.artist.bio}
          </Text>
        </View>
      </ScrollView>      
    );
  }

  _goToLocation() {
    this.props.navigator.push({
      title: 'Locations',
      component: Locations,
      // rightButtonTitle: 'Altro',
      // onRightButtonPress: () => this.props.navigator.pop(),
      passProps: { artist: this.state.artist }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    flex: 1,
    flexDirection: 'row',    
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#ED253C',
    color: 'white',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5    
  },
  details: {
    margin: 20,
    marginBottom: 0
  },
  bio: {
    marginTop: 20
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
