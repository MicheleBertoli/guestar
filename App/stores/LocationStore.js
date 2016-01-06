/*
 * LocationStore
 */

'use strict';

import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants  from '../constants/AppConstants';
import BaseStore from './BaseStore';

const _state = {
  locations: [],
  isLocationCreated: false
};

const _setLocations = locations => _state.locations = locations.reverse();
const _setLocationCreated = isLocationCreated =>
  _state.isLocationCreated = isLocationCreated;

const LocationStore = _.assign({}, BaseStore, {

  getLocations() {
    return _state.locations;
  },

  isLocationCreated() {
    return _state.isLocationCreated;
  }

});

AppDispatcher.register(action => {

  switch(action.actionType) {
    case AppConstants.GET_LOCATIONS_SUCCESS:
      _setLocations(action.locations);
      LocationStore.emitChange();
      break;
    case AppConstants.CREATE_LOCATION_SUCCESS:
      _setLocationCreated(true);
      LocationStore.emitChange();
      break;
  }

});

export default LocationStore;
