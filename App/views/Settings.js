/**
 * Settings Component
 */

'use strict';

import React from 'react-native';
import LoginActions from '../actions/LoginActions';

import { 
  TableView, 
  Section, 
  Cell, 
  CustomCell 
} from 'react-native-tableview-simple';

const { 
  Component, 
  StyleSheet, 
  ScrollView, 
  View, 
  Text, 
  AsyncStorage,
  ActivityIndicatorIOS, 
  SwitchIOS,
  NativeModules: { FBLoginManager }
} = React;

class Settings extends Component {
    
  constructor(props) {
    super(props);
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
            <Cell 
              cellstyle="Basic" 
              title="Sezione 1" 
              accessory="DisclosureIndicator"
              onPress={() => console.log('Heyho!')}
            />
            <Cell 
              cellstyle="Basic" 
              title="Sezione 2" 
              accessory="DisclosureIndicator" 
              onPress={() => console.log('Heyho!')}
            />
            <Cell 
              cellstyle="Basic" 
              title="Logout" 
              accessory="DisclosureIndicator" 
              onPress={() => this._logoutUser()}
            />
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

  _logoutUser() {
    FBLoginManager.logout(function(error, data){
      if (!error) {
        AsyncStorage.removeItem('accessToken'); 
        LoginActions.logoutUser();   
      } else {
        console.log(error, data);
      }
    });
  }
}

const styles = StyleSheet.create({
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
