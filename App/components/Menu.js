/**
 * Menu Component
 */

'use strict';

import React from 'react-native';

const { 
  Component, 
  StyleSheet, 
  NavigatorIOS, 
  TabBarIOS, 
  StatusBarIOS, 
  View 
} = React;

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'first'
    };
  }

  renderSection(route) {
    return (
      <NavigatorIOS
        initialRoute={route}
        style={styles.header}
        barTintColor='#ED253C'
        tintColor='#FFFFFF'
        titleTextColor='#FFFFFF'        
        translucent={false}
      />
    );
  }

  render() {
    return (
      <TabBarIOS 
        selectedTab={this.state.selectedTab} 
        tintColor="#ED253C"
        barTintColor="white" 
        style={styles.menu}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'first'}
          systemIcon='most-recent'
          onPress={() => {
            this.setState({
              selectedTab: 'first'
            });
          }}>
          {this.renderSection(this.props.firstRoute)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'second'}
          systemIcon='featured'
          onPress={() => {
            this.setState({
              selectedTab: 'second'
            });
          }}>
          {this.renderSection(this.props.secondRoute)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'third'}
          systemIcon='most-viewed'
          onPress={() => {
            this.setState({
              selectedTab: 'third'
            });
          }}>
          {this.renderSection(this.props.thirdRoute)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'fourth'}
          systemIcon='more'
          onPress={() => {
            this.setState({
              selectedTab: 'fourth'
            });
          }}>
          {this.renderSection(this.props.fourthRoute)}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }

}

const styles = StyleSheet.create({
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
