/*
 * ArtistActions
*/

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import GuestarAPI from '../utils/GuestarAPI';

const ArtistActions = {

	getArtistData() {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_ARTIST_DATA
    });
    GuestarAPI.getArtistData();
  },

  getArtistDataSuccess(artist) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_ARTIST_DATA_SUCCESS,
      artist: artist
    });
  },

  getArtistDataFail(error) {
    AppDispatcher.dispatch({
      actionType: AppConstants.GET_ARTIST_DATA_FAIL,
      artist: error
    });
  }

};

export default ArtistActions;
