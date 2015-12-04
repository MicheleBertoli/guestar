/*
 * WelcomeActions
 */

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import GuestarAPI from '../utils/GuestarAPI';

const WelcomeActions = {

	getArtistsData() {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_ARTISTS_DATA
    });
    GuestarAPI.getArtistsData();
  },

  getArtistsDataSuccess(artists) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_ARTISTS_DATA_SUCCESS,
      artists: artists
    });
  },

  getArtistsDataFail(error) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_ARTISTS_DATA_FAIL,
      artists: error
    });
  }

};

export default WelcomeActions;
