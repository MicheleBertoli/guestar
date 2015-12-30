/**
 * NewLocation Component
 */

'use strict';

import React from 'react-native';
import LocationActions from '../../actions/LocationActions';

import Select from '../../components/Select';
import MapBox from '../../components/MapBox';
import MapTextInput from '../../components/MapTextInput';

const { 
  Component, 
  StyleSheet,
  Text,
  TextInput,
  AlertIOS,
  PickerIOS,
  TouchableOpacity,
  Modal,
  View,
  ScrollView 
} = React;

const tipologia = [
  'Villa/Casa singola',
  'Appartamento',
  'Villetta multifamiliare',
  'Stabile/magazzino'
];

const spazio = [
  'Meno di 20mq',
  'Da 20mq a 40mq',
  'Da 40mq a 60mq',
  'Da 60mq a 100mq',
  'Oltre 100mq'
];

const persone = [
  'Fino a 10 persone',
  'Da 10 a 20 persone',
  'Da 20 a 30 persone',
  'Da 30 a 40 persone',
  'Da 40 a 50 persone',
  'Oltre 50 persone'
];

class NewLocation extends Component {
    
  constructor(props) {
    super(props); 

    this.state = {
      user: this.props.user,
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
      <ScrollView 
        style={styles.container}
        contentInset={{ bottom: 64 }}
        keyboardDismissMode={'on-drag'}>

        <MapTextInput
          placeholder='Indirizzo (es. Via Tommaseo 49, Brescia)'
          setAddress={(data, details) => this._setAddress(data, details)}      
        />

        <MapBox
          region={this.state.region}
          annotations={this.state.annotations}
        />

        <View style={styles.details}>   
          <View style={styles.sectionFirst}>
            <TextInput 
              placeholder='Nome'
              onChangeText={(nome) => {
                this.setState({nome: nome});
              }}
              style={styles.formText}
            />
          </View>
          <View style={styles.section}>
            <Select 
              data={tipologia}
              placeholder='Tipologia'
              selected={(selected) => {
                this.setState({
                  tipologia: selected
                });
              }}
            />
          </View>
          <View style={styles.section}>
            <Select 
              data={spazio}
              placeholder='Spazio a disposizione'
              selected={(selected) => {
                this.setState({
                  spazio: selected
                });
              }}
            />
          </View>
          <View style={styles.section}>
            <Select 
              data={persone}
              placeholder='Numero max di persone'
              selected={(selected) => {
                this.setState({
                  persone: selected
                });
              }}
            />
          </View>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => this._createLocation()} 
            underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Salva</Text>
          </TouchableOpacity>       
        </View>
      </ScrollView>      
    );
  }

  _setAddress(data, details) {
    this.setState({
      region: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng
      },
      annotations: [{
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        animateDrop: true
      }],
      isRegionSelected: true           
    });
  }

  _createLocation() {
    if(this.state.nome && this.state.tipologia && 
      this.state.spazio && this.state.persone &&
      this.state.isRegionSelected) {
      console.log('Nome: ' + this.state.nome);
      console.log('Tipologia: ' + this.state.tipologia);
      console.log('Spazio: ' + this.state.spazio);
      console.log('Persone: ' + this.state.persone);
    }

    // (this.state.isRegionSelected) ?
    //   console.log(this.state.region)
    // :
    //   AlertIOS.alert(
    //     'Guestar', 
    //     'Inserisci una via 😊', 
    //     [{text: 'OK'}], 
    //     'default'
    //   );

    //LocationActions.createLocation();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  details: {
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
    margin: 20,
    justifyContent: 'center'
  },
  sectionFirst: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    height: 60
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    height: 60
  },
  modalContainer: {
    position: 'absolute',
    alignItems: 'center',
    height: 320,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#DDD',
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    opacity: 0.95
  },
  modalInnerContainer: {
    alignItems: 'center'
  },
  formText: {
    height: 40
  },
  tipologiaButton: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default NewLocation;
