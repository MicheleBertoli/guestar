/**
 * Login Component
 */

'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import Video from 'react-native-video';

import HomeActions from '../actions/HomeActions';
import LoginButton from '../components/LoginButton';
import Welcome from './Welcome';

const {
  width, 
  height
} = Dimensions.get('window');

const {
  Component,
  StyleSheet,
  Text,
  View
} = React;

class Login extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      HomeActions.setLoading(true);
    }, 1);
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
        <LoginButton 
          navigator={this.props.navigator}
          style={styles.loginButton}
          route={{
            title: 'Guestar',
            component: Welcome
          }}
        />        
      </View>
    );
  }
}

let styles = StyleSheet.create({
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
  loginButton: {
    position: 'absolute',
    width: width,
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Login;