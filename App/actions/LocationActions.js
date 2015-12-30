/*
 * LocationActions
*/

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import GuestarAPI from '../utils/GuestarAPI';

const LocationActions = {

  createLocation(locationData) {
    AppDispatcher.dispatch({
      actionType: AppConstants.CREATE_LOCATION,
      locationData: locationData
    });
    GuestarAPI.createLocation(locationData);
  },

  createLocationSuccess(location) {
    AppDispatcher.dispatch({
      actionType: AppConstants.CREATE_LOCATION_SUCCESS,
      location: location
    });
  },

  createLocationFail(error) {
    AppDispatcher.dispatch({
      actionType: AppConstants.CREATE_LOCATION_FAIL,
      location: error
    });
  }

};

export default LocationActions;
