/*
 * ArtistActions
 */

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ArtistConstants from '../constants/ArtistConstants';

let ArtistActions = {

  setData(data) {
		AppDispatcher.dispatch({
  		actionType: ArtistConstants.SET_ARTIST_DATA,
  		artist: data
  	});
  }
  
};

export default ArtistActions;
