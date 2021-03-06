/**
 * Login component
 */

'use strict';

import React from 'react-native';
import FBLogin from 'react-native-facebook-login';
import Video from 'react-native-video';

import LoginActions from '../actions/LoginActions';

const { 
  Component, 
  StyleSheet,
  AsyncStorage, 
  Image, 
  Dimensions,
  View, 
  Text, 
  TouchableOpacity,
  NativeModules: { FBLoginManager }
} = React;

const {
  width, 
  height
} = Dimensions.get('window');

class Login extends Component {
    
  constructor(props) {
    super(props);   
    this.state = {
      user: null
    };
  }

  render() {
    return (

      <View style={styles.container}>
        <Video 
          source={{ uri: 'http://bit.ly/1NcmNxD' }}
          rate={1.0}
          volume={1.0}
          muted={true}
          paused={false}
          resizeMode='cover'
          repeat={true}
          onLoadStart={this.loadStart}
          onLoad={this.setDuration}
          onProgress={this.setTime}
          onEnd={this.onEnd}
          onError={this.videoError}
          style={styles.backgroundVideo} 
        />  
        <Text style={[styles.text, styles.promoHeader]}>
          Guestar
        </Text>
        <Text style={[styles.text, styles.promoDescription]}>
          Invita gli artisti a casa tua!
        </Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => this._handleLogin()}>
          <View style={styles.FBLoginButton}>
            <Image 
              style={styles.FBLogo} 
              source={require('image!FB-f-Logo__white_144')} 
            />
            <Text 
              style={styles.FBLoginButtonText}
              numberOfLines={1}>
              Entra con Facebook
            </Text>
          </View>
        </TouchableOpacity>        
      </View>
    );
  }

  _handleLogin() {
    const _this = this;
    FBLoginManager.loginWithPermissions(['email'], function(error, data){
      if (!error) {
        _this.setState({ user: data });
        LoginActions.loginUser(data.credentials.token);
      } else {
        console.log(error, data);
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#222',    
    alignItems: 'center',
    width: width,
    height: height
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  promoHeader: {
    fontSize: 42,
    fontWeight: '700',
    alignSelf: 'center',
    position: 'relative',
    top: 60
  },
  promoDescription: {
    fontSize: 22,
    fontWeight: '300',
    width: 220,
    alignSelf: 'center',
    position: 'relative',
    top: 80
  },
  button: {
    position: 'absolute',
    left: width/2,
    marginLeft: -85,
    bottom: 60,
    backgroundColor: 'transparent'
  },
  FBLoginButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    width: 170,
    height: 30,
    paddingLeft: 15,

    backgroundColor: 'rgb(66,93,174)',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgb(66,93,174)',

    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
  FBLoginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Helvetica neue',
    fontSize: 14.2,
  },
  FBLoginButtonTextLoggedIn: {
    marginLeft: 5,
  },
  FBLogo: {
    position: 'absolute',
    height: 14,
    width: 14,

    left: 7,
    top: 7,
  },
});

export default Login;