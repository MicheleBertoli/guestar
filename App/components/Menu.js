/**
 * Menu Component
 */

'use strict';

import React from 'react-native';

import Welcome from '../sections/Welcome';
import Artist from '../sections/Artist';
import Event from '../sections/Event';
import Settings from '../sections/Settings';

let { Component, StyleSheet, NavigatorIOS, TabBarIOS, StatusBarIOS, View } = React;

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'welcome'
    };    
  }

  componentDidMount() {
    StatusBarIOS.setStyle('light-content');
  }

  renderSection(firstRoute) {
    return (
      <NavigatorIOS
        initialRoute={firstRoute}
        style={styles.header}
        barTintColor='#ED253C'
        tintColor='#FFFFFF'
        titleTextColor='#FFFFFF'        
        translucent={false}
      />
    )
  }

  render() {

    const firstWelcomeRoute = {
      title: 'Guestar',
      component: Welcome
    }
    
    const firstArtistRoute = {
      title: 'Artista',
      component: Artist
    }

    const firstEventRoute = {
      title: 'Evento',
      component: Event
    }

    const firstSettingsRoute = {
      title: 'Impostazioni',
      component: Settings,
      passProps: this.props
    }

    return (
      <TabBarIOS 
        selectedTab={this.state.selectedTab} 
        tintColor="#ED253C"
        barTintColor="white" 
        style={styles.menu}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'welcome'}
          systemIcon='most-recent'
          onPress={() => {
            this.setState({
              selectedTab: 'welcome'
            });
          }}>
          {this.renderSection(firstWelcomeRoute)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'artist'}
          systemIcon='featured'
          onPress={() => {
            this.setState({
              selectedTab: 'artist'
            });
          }}>
          {this.renderSection(firstArtistRoute)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'event'}
          systemIcon='most-viewed'
          onPress={() => {
            this.setState({
              selectedTab: 'event'
            });
          }}>
          {this.renderSection(firstEventRoute)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'settings'}
          systemIcon='more'
          onPress={() => {
            this.setState({
              selectedTab: 'settings'
            });
          }}>
          {this.renderSection(firstSettingsRoute)}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }

}

let styles = StyleSheet.create({
  menu: {
    position: 'relative',
    backgroundColor: 'white',
    bottom: 0,
    right: 0,
    left: 0
  },
  header: {
    flex: 1
  }
});

export default Menu;
