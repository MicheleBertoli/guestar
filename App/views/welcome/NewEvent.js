/**
 * NewEvent Component
 */

'use strict';

import React from 'react-native';
import Helpers from '../../utils/Helpers';

// import EventActions from '../../actions/EventActions';
// import EventStore from '../../stores/EventStore';

import SelectDate from '../../components/SelectDate';

const { 
  Component, 
  StyleSheet,
  Text,
  TextInput,
  Image,
  AlertIOS,
  TouchableOpacity,
  View,
  ScrollView,
  NativeModules: { UIImagePickerManager }
} = React;

class NewEvent extends Component {
    
  constructor(props) {
    super(props); 

    this.state = {
      immagine: null,
      //eventCreated: EventStore.isEventCreated()
    };

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    //EventStore.addChangeListener(this._onChange);
  }

  componentDidUpdate(prevProps, prevState) {
    // if(prevState.isLocationCreated !== this.state.isLocationCreated) {
    //   this._confirmAndGetBack();
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  componentWillUnmount() {
    //EventStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <ScrollView 
        ref='scrollView'
        style={styles.container}
        contentInset={{ bottom: 112 }}
        keyboardDismissMode={'on-drag'}>

        {this.state.immagine ?
          <Image 
            style={styles.image} 
            source={this.state.immagine} 
            resizeMode={'cover'} 
          />
        :
          <View style={styles.imagePlaceholder}>
            <Text>Seleziona un'immagine</Text>
          </View>
        }

        <TouchableOpacity 
          style={[styles.button, styles.buttonImage]} 
          onPress={() => this._selectImage()}>
          <Text style={[styles.buttonText, styles.buttonImageText]}>
            Seleziona un'immagine
          </Text>
        </TouchableOpacity>  

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
            <TextInput
              editable={false}
              placeholder='Artista'
              style={styles.formText}
              value={this.props.artist.name}
            />
          </View>
          <View style={styles.section}>
            <TextInput
              editable={false}
              placeholder='Location'
              style={styles.formText}
              value={this.props.location.name}
            />
          </View>
          <View style={styles.section}>
            <SelectDate
              placeholder='Data evento'
              selected={(selected) => {
                this.setState({
                  data: selected
                });
              }}
            />
          </View>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => this._createEvent()}>
            <Text style={styles.buttonText}>Crea il tuo evento</Text>
          </TouchableOpacity>       
        </View>
      </ScrollView>      
    );
  }

  _createEvent() {

    if(this.state.nome && this.state.descrizione && 
      this.state.data && this.state.immagine) {
      
      const eventData = {
        uid: this.props.user.uid,
        name: this.state.nome,
        description: this.state.descrizione,
        date: this.state.date,
        image: this.state.immagine,
        location: {
          name: this.props.location.name,
          lat: this.props.location.location.lat,
          lng: this.props.location.location.lng
        },
        artist: {
          id: this.props.artist.id,
          name: this.props.artist.name
        }
      };

      //EventActions.createEvent(eventData);
    }
    else {
      let message = '';

      if(!this.state.nome) 
        message += '- Nome dell\'evento\n';
      if(!this.state.descrizione) 
        message += '- Descrizione dell\'evento\n';   
      if(!this.state.data) 
        message += '- Data dell\'evento\n';      
      if(!this.state.immagine) 
        message += '- Immagine della location';              
      
      AlertIOS.alert(
        'Guestar', 
        'Hey amico/a 😊\nHai dimenticato questi dati:\n\n' + message, 
        [{text: 'OK'}], 
        'default'
      );
    }    
  }

  _selectImage() {    
    const options = {
      title: 'Seleziona un\'immagine',
      cancelButtonTitle: 'Annulla',
      takePhotoButtonTitle: 'Scatta una foto...',
      chooseFromLibraryButtonTitle: 'Scegli dalla libreria...',
      maxWidth: 800,
      maxHeight: 800,
      quality: 1,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    UIImagePickerManager.showImagePicker(options, (didCancel, response) => {
      if (didCancel) {
        console.log('User cancelled image picker');
      }
      else {
        if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          const source = {
            uri: 'data:image/jpeg;base64,' + response.data,
            isStatic: true
          };
          
          this.setState({ immagine: source });
        }
      }
    });
  }

  _confirmAndGetBack() {
    AlertIOS.alert(
      'Guestar', 
      'Evento creato! 😊', 
      [{
        text: 'OK', 
        onPress: (text) => {
          // Push 'Evento creato'
        }
      }], 
      'default'
    );
  }

  _onChange() {
    // this.setState({
    //   isEventCreated: EventStore.isEventCreated()
    // });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 200,
    backgroundColor: '#FFF'
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  details: {
    marginBottom: 0
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ED253C',
    padding: 10,
    margin: 20,
    borderRadius: 5   
  },
  buttonImage: {
    backgroundColor: '#666'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
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
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default NewEvent;
