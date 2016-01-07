/*
 * EventStore
 */

'use strict';

import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants  from '../constants/AppConstants';
import BaseStore from './BaseStore';

const _state = {
  events: [],
  isEventCreated: false
};

const _setEvents = events => _state.events = events.reverse();
const _setEventCreated = isEventCreated =>
  _state.isEventCreated = isEventCreated;

const EventStore = _.assign({}, BaseStore, {

  getEvents() {
    return _state.events;
  },

  isEventCreated() {
    return _state.isEventCreated;
  }

});

AppDispatcher.register(action => {

  switch(action.actionType) {
    case AppConstants.GET_EVENTS_SUCCESS:
      _setEvents(action.events);
      EventStore.emitChange();
      break;
    case AppConstants.CREATE_EVENT_SUCCESS:
      _setEventCreated(true);
      EventStore.emitChange();
      break;
  }

});

export default EventStore;
