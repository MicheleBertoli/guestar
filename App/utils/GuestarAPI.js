/*
 * GuestarAPI
 */

'use strict';

import Rebase from 're-base';
import WelcomeActions from '../actions/WelcomeActions';
import LoginActions from '../actions/LoginActions';
import ArtistActions from '../actions/ArtistActions';
import LocationActions from '../actions/LocationActions';

const base = Rebase.createClass('https://guestar.firebaseio.com');
let artists, locations;

const GuestarAPI = {

  loginUser(token) {
    base.authWithOAuthToken('facebook', token, function(error, authData) {
      if (error) {
        LoginActions.loginUserFail(error);
      } else {
        console.log(authData);
        LoginActions.loginUserSuccess(authData);
      }
    });
  },

  logoutUser() {
    base.removeBinding(artists);
    base.removeBinding(locations);
    LoginActions.logoutUserSuccess();
  },

  getArtists() {
  	artists = base.listenTo('artists', {
	    context: this,
	    asArray: true,
	    then(artists) {
	      WelcomeActions.getArtistsSuccess(artists);
	    },
	    error(error) {
	    	WelcomeActions.getArtistsError(error);
	    }
	  });
  },

  getArtist(id) {
  	base.fetch('artists/' + id, {
	    context: this,
	    asArray: false,
	    then(artist){
	      ArtistActions.getArtistSuccess(artist);
	    },
	    error(error) {
	    	ArtistActions.getArtistError(error);
	    }
	  });
  },

  getLocations() {
    locations = base.listenTo('locations', {
      context: this,
      asArray: true,
      then(locations) {
        LocationActions.getLocationsSuccess(locations);
      },
      error(error) {
        LocationActions.getLocationsError(error);
      }
    });
  },

  createLocation(locationData) {
    base.push('locations', {
      data: locationData,
      then(){
        LocationActions.createLocationSuccess();
      }
    });
  },

  removeLocationsBinding() {
    base.removeBinding(locations);
  }
	
};

export default GuestarAPI;
