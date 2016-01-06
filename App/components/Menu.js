/**
 * Menu Component
 */

'use strict';

import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
        barTintColor='#FFFFFF'
        tintColor='#ED253C'
        translucent={false}
        style={styles.menu}>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'first'}
          title={null}
          iconName={this.props.firstRoute.iconName}
          selectedIconName={this.props.firstRoute.selectedIconName}
          onPress={() => {
            this.setState({
              selectedTab: 'first'
            });
          }}>
          {this.renderSection(this.props.firstRoute)}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'second'}
          title={null}
          iconName={this.props.secondRoute.iconName}
          selectedIconName={this.props.secondRoute.selectedIconName}
          onPress={() => {
            this.setState({
              selectedTab: 'second'
            });
          }}>
          {this.renderSection(this.props.secondRoute)}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'third'}
          title={null}
          iconName={this.props.thirdRoute.iconName}
          selectedIconName={this.props.thirdRoute.selectedIconName}
          iconSize={34}
          onPress={() => {
            this.setState({
              selectedTab: 'third'
            });
          }}>
          {this.renderSection(this.props.thirdRoute)}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'fourth'}
          title={null}
          iconName={this.props.fourthRoute.iconName}
          selectedIconName={this.props.fourthRoute.selectedIconName}
          onPress={() => {
            this.setState({
              selectedTab: 'fourth'
            });
          }}>
          {this.renderSection(this.props.fourthRoute)}
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }

}

const styles = StyleSheet.create({
  menu: {
    position: 'relative',
    bottom: 0,
    right: 0,
    left: 0
  },
  header: {
    flex: 1
  }
});

export default Menu;
