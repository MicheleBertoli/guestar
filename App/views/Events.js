/**
 * Events Component
 */

'use strict';

import React from 'react-native';

import EventStore from '../stores/EventStore';
import EventActions from '../actions/EventActions';
import Event from './events/Event';

const { 
  Component, 
  StyleSheet, 
  View, 
  Text,
  SegmentedControlIOS,
  ListView,
  Image,
  TouchableOpacity
} = React;

class Events extends Component {
    
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      section: 'all',
      selectedIndex: 0,
      events: dataSource.cloneWithRows(EventStore.getEvents()),
      user: this.props.user
    };

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    EventStore.addChangeListener(this._onChange);
    EventActions.getEvents(this.state.user.uid);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.events !== this.state.events;
  }

  componentWillUnmount() {
    EventActions.removeEventsBinding();
    EventStore.removeChangeListener(this._onChange);    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.selectEvents}>

          <View>

          </View>

          <SegmentedControlIOS 
            values={['Tutti', 'Personali']} 
            selectedIndex={this.state.selectedIndex}
            style={styles.selector}
            tintColor='#ED253C'
            onChange={(event) => this._selectSection(event)}
            translucent={false}
          />
        </View>
        <ListView
          dataSource={this.state.events}
          renderRow={(rowData) => this._getEventInfo(rowData)}
          contentInset={{ bottom: 112 }}  
        />
      </View>
    );
  }

  _getEventInfo(event) {  
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._goToEvent(event)}>
          
          <Image 
            style={styles.image}
            source={{ uri: event.image.uri }}
          />
        
          <View style={styles.textContainer}>
            <Text
              style={[styles.text, styles.name]}>
              {event.name}
            </Text>
            <Text
              style={[styles.text, styles.artistName]}>
              {event.artist.name}
            </Text>
          </View>

        </TouchableOpacity>
      </View>        
    );
  }

  _goToEvent(event) {
    this.props.navigator.push({
      title: 'Evento',
      component: Event,
      backButtonTitle: 'Indietro',      
      passProps: { event: event }
    });
  }  
  
  _selectSection(event) {
    if(event.nativeEvent.selectedSegmentIndex === 0) {
      this.setState({
        section: 'all',
        selectedIndex: 0
      });
    }
    else if(event.nativeEvent.selectedSegmentIndex === 1) {
      this.setState({
        section: 'personal',
        selectedIndex: 1
      });
    }
  } 

  _onChange() {
    this.setState({
      events: this.state.events.cloneWithRows(
        EventStore.getEvents()
      )
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  selectEvents: {
    padding: 20,
    backgroundColor: '#FFF'
  },
  map: {
    flex: 1,
    height: 250
  },
  image: {
    height: 150
  },
  infoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: 300,
    height: 150,
    opacity: 0.5,
    backgroundColor: '#222',
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  text: {
    fontSize: 16,
    color: '#fff',
    shadowColor: '#666',
    shadowRadius: 3,
    shadowOpacity: 100,
    shadowOffset: { width: 1, height : 1}
  },
  name: {
    fontSize: 30
  },
  artistName: {
    fontSize: 16
  }
});

export default Events;