/*
 * GuestarAPI
 */

'use strict';

import Rebase from 're-base';
import WelcomeActions from '../actions/WelcomeActions';
import LoginActions from '../actions/LoginActions';
import ArtistActions from '../actions/ArtistActions';

const base = Rebase.createClass('https://guestar.firebaseio.com');
let listenToArtist;

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

  getArtistsData() {
  	listenToArtist = base.listenTo('artists', {
	    context: this,
	    asArray: true,
	    then(artists) {
	      WelcomeActions.getArtistsDataSuccess(artists);
	    },
	    error(error) {
	    	WelcomeActions.getArtistsDataError(error);
	    }
	  });
  },

  getArtistData(id) {
  	base.fetch('artists/' + id, {
	    context: this,
	    asArray: false,
	    then(artist){
	      ArtistActions.getArtistDataSuccess(artist);
	    },
	    error(error) {
	    	ArtistActions.getArtistDataError(error);
	    }
	  });
  },

  logoutUser() {
    base.removeBinding(listenToArtist);
    LoginActions.logoutUserSuccess(); 
  }
	
};

export default GuestarAPI;
