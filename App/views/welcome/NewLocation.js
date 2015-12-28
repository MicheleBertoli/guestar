/**
 * NewLocation Component
 */

'use strict';

import React from 'react-native';
import { 
  GooglePlacesAutocomplete 
} from 'react-native-google-places-autocomplete';
import t from 'tcomb-form-native';

import MapComponent from '../../components/MapComponent';

const { 
  Component, 
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView 
} = React;

const Form = t.form.Form;
const Location = t.struct({
  nome: t.String
});

class NewLocation extends Component {
    
  constructor(props) {
    super(props); 

    this.state = {
      region: {
        latitude: 40.941728,
        longitude: 3.5839248
      }      
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  render() {
    return (
      <ScrollView style={styles.container} contentInset={{ bottom: 64 }}>
        <GooglePlacesAutocomplete
          placeholder='Inserisci una via...'
          minLength={2}
          autoFocus={false}
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(details);
            this.setState({
              region: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng
              },
              annotations: [{
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                animateDrop: true
              }]            
            });
          }}
          getDefaultValue={() => {
            return '';
          }}
          query={{
            key: 'AIzaSyCreHSBv6EMwBkvfeI39iaPtqVa_6RG7Ys',
            language: 'it',
            types: 'address',
          }}
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
            listView: styles.listView,
            row: styles.row
          }}
        />

        <MapComponent
          region={this.state.region}
          annotations={this.state.annotations}
        />
        
        <View style={styles.details}>
          <Form
            ref='form'
            type={Location}
            options={{
              auto: 'placeholders'
            }}
          />

          <TouchableOpacity 
            style={styles.button} 
            onPress={this.onPress} 
            underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Salva</Text>
          </TouchableOpacity>          
        </View>
      </ScrollView>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  details: {
    margin: 20,
    marginBottom: 0
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#ED253C',
    borderColor: '#DB2033',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  textInputContainer: {
    backgroundColor: '#FFF',
    borderTopColor: '#FFF',
    borderBottomColor: '#FFF',
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 50,
    paddingTop: 6.5,
    paddingBottom: 6.5,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 0,
    fontSize: 17,
  },
  listView: {
    flex: 1,
    marginTop: 10,
    borderTopColor: '#CCCCCC',
    borderTopWidth: 1,
    height: 135
  },
  row: {
    paddingLeft: 20
  }  
});

export default NewLocation;
