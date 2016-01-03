/**
 * NewLocation Component
 */

'use strict';

import React from 'react-native';
import Helpers from '../../utils/Helpers';
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

const tipologia = {
  'mansion' : 'Villa/Casa singola',
  'apartment' : 'Appartamento',
  'multifamily' : 'Villetta multifamiliare',
  'warehouse' : 'Stabile/magazzino'
};

const spazio = {
  '<20' : 'Meno di 20mq',
  '20-40' : 'Da 20mq a 40mq',
  '40-60' : 'Da 40mq a 60mq',
  '60-100' : 'Da 60mq a 100mq',
  '>100' : 'Oltre 100mq'
};

const persone = {
  '<=10' : 'Fino a 10 persone',
  '10-20' : 'Da 10 a 20 persone',
  '20-30' : 'Da 20 a 30 persone',
  '30-40' : 'Da 30 a 40 persone',
  '40-50' : 'Da 40 a 50 persone',
  '>50' : 'Oltre 50 persone'
};

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
        ref='scrollView'
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
            <TextInput 
              placeholder='Descrizione'
              multiline={true}
              onFocus={() => {
                this.refs.scrollView.getScrollResponder().scrollTo(100);
              }}
              onChangeText={(descrizione) => {
                this.setState({descrizione: descrizione});
              }}
              style={styles.descriptionText}
            />
          </View>
          <View style={styles.section}>
            <Select 
              data={Object.keys(tipologia).map(key => tipologia[key])}
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
              data={Object.keys(spazio).map(key => spazio[key])}
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
              data={Object.keys(persone).map(key => persone[key])}
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

    if(this.state.nome && this.state.description && this.state.tipologia && 
      this.state.spazio && this.state.persone && this.state.isRegionSelected) {
      
      const type = Helpers.getKeyByValue(tipologia, this.state.tipologia);
      const space = Helpers.getKeyByValue(spazio, this.state.spazio);
      const people = Helpers.getKeyByValue(persone, this.state.persone);

      const locationData = {
        name: this.state.nome,
        description: this.state.description,
        type: type,
        space: space,
        people: people,
        location: {
          lat: this.state.region.latitude,
          lng: this.state.region.longitude
        }
      };

      // LocationActions.createLocation(locationData);
    }
    else {
      let message = '';

      if(!this.state.nome) 
        message += '- Nome della location\n';
      if(!this.state.isRegionSelected) 
        message += '- Indirizzo della location\n';      
      if(!this.state.tipologia) 
        message += '- Tipologia della location\n';
      if(!this.state.spazio) 
        message += '- Spazio a disposizione\n';
      if(!this.state.persone) 
        message += '- Numero massimo di persone';      

      AlertIOS.alert(
        'Guestar', 
        'Hey amico 😊\nHai dimenticato questi dati:\n\n' + message, 
        [{text: 'OK'}], 
        'default'
      );
    }    
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
    paddingLeft: 20
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20
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
    height: 40,
    fontSize: 17
  },
  descriptionText: {
    height: 80,
    fontSize: 17
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
