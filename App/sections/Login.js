/**
 * Login Component
 */

'use strict';

import React from 'react-native';
import FBLogin from 'react-native-facebook-login';

let { Component, StyleSheet, Image, View, Text, TouchableOpacity, NativeModules: { FBLoginManager }} = React;

import Menu from '../components/Menu';

class Login extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };    
  }

  handleLogin() {
    const _this = this;
    FBLoginManager.loginWithPermissions(["email"], function(error, data){
      if (!error) {
        console.log(data);
        _this.setState({ user : data});
        _this.props.onLogin && _this.props.onLogin();        
      } else {
        console.log(error, data);
      }
    });
  }

  handleLogout() {
    const _this = this;
    FBLoginManager.logout(function(error, data){
      if (!error) {
        _this.setState({ user : null});
        _this.props.onLogout && _this.props.onLogout();
      } else {
        console.log(error, data);
      }
    });
  }

  onPress() {
    this.state.user
      ? this.handleLogout()
      : this.handleLogin();
    this.props.onPress && this.props.onPress();
  }

  componentWillMount() {
    const _this = this;    
    FBLoginManager.getCredentials(function(error, data){
      if (!error) {
        _this.setState({ user : data})
      }
    });
  }

  render() {

    let text = this.state.user ? "Log out" : "Log in with Facebook";

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.onPress()} >
          <View style={styles.FBLoginButton}>
            <Image style={styles.FBLogo} source={require('image!FB-f-Logo__white_144')} />
            <Text style={[styles.FBLoginButtonText, this.state.user ? styles.FBLoginButtonTextLoggedIn : styles.FBLoginButtonTextLoggedOut]}
              numberOfLines={1}>{text}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  FBLoginButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    height: 30,
    marginTop: 60,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,

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
  },
  FBLoginButtonTextLoggedOut: {
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