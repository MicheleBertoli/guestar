/*
 * ArtistActions
 */

 'use strict';

 import AppDispatcher from '../dispatcher/AppDispatcher';
 import AppConstants from '../constants/AppConstants';

 const ArtistActions = {

 	setData(data) {
 	  AppDispatcher.dispatch({
 		  actionType: AppConstants.SET_ARTIST_DATA,
 	    artist: data
 		});
 	}

 };

 export default ArtistActions;
