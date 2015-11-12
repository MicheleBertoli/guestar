/**
 * Settings Component
 */

'use strict';

import React from 'react-native';

let { Component, StyleSheet, ScrollView, View, Text, ActivityIndicatorIOS, SwitchIOS} = React;
import { TableView, Section, Cell, CustomCell } from 'react-native-tableview-simple';

import Login from '../sections/Login';

class Settings extends Component {
    
  constructor(props) {
    super(props);
    console.log(props);
  }

  goToLogin() {
    this.props.navigator.push({
      title: "Profilo",
      component: Login
    });
  }

  render() {
    return (
      <ScrollView 
        contentContainerStyle={styles.container}
        contentInset={{bottom: 64}}>

        <View style={styles.account}>
          <View style={styles.photo}></View>
        </View>

        <TableView>
          <Section header="STANDARD" footer="A Footer">
            <Cell cellstyle="Basic" title="Sezione 1" accessory="DisclosureIndicator" onPress={() => console.log('Heyho!')}/>
            <Cell cellstyle="Basic" title="Sezione 2" accessory="DisclosureIndicator" onPress={() => console.log('Heyho!')}/>
            <Cell cellstyle="Basic" title="Login" accessory="DisclosureIndicator" onPress={() => this.goToLogin()}/>
          </Section>
          <Section header="CUSTOMCELLS">
            <CustomCell>
              <Text style={{flex: 1, fontSize: 16}}>Loading</Text>
              <ActivityIndicatorIOS/>
            </CustomCell>
            <CustomCell>
              <Text style={{flex: 1, fontSize: 16}}>Switch</Text>
              <SwitchIOS/>
            </CustomCell>
          </Section>
        </TableView>
      </ScrollView>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFF4',
    paddingBottom: 20
  },
  account: {
    backgroundColor: '#37474F',
    height: 200,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  photo: {
    backgroundColor: '#ffc107',
    width: 80,
    height: 80,
    borderRadius: 10
  }
});

export default Settings;
