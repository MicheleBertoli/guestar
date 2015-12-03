/**
 * Event Component
 */

'use strict';

import React from 'react-native';

let { 
  Component, 
  StyleSheet, 
  Image, 
  View, 
  Text, 
  TouchableOpacity, 
  NativeModules: { UIImagePickerManager }
} = React;

class Event extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null
    };
  }

  selectImage() {
    const options = {
      title: 'Seleziona un\'immagine',
      cancelButtonTitle: 'Annulla',
      takePhotoButtonTitle: 'Scatta una foto...',
      chooseFromLibraryButtonTitle: 'Scegli dalla libreria...',
      maxWidth: 500,
      maxHeight: 500,
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
          
          this.setState({
            avatarSource: source
          });
        }
      }
    });
  }

  render() {

    if(this.state.avatarSource) {
      console.log(this.state.avatarSource.uri);
    }

    return (
      <View style={styles.container}>

        <Image 
          style={styles.avatar} 
          source={this.state.avatarSource} 
          resizeMode={'cover'} 
        />

        <View style={styles.content}>
          <TouchableOpacity onPress={::this.selectImage}>
            <Text style={styles.button}>Select a Photo</Text>
          </TouchableOpacity>
        </View>
         
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatar: {
    height: 200,
    backgroundColor: '#DDD'
  },
  content: {
    alignItems: 'center'
  },
  button: {
    margin: 50,
    backgroundColor: '#ED253C',
    color: 'white',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center'
  }
});

export default Event;