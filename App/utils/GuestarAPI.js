/*
 * GuestarAPI
 */

'use strict';

import Rebase from 're-base';
import WelcomeActions from '../actions/WelcomeActions';
import ArtistActions from '../actions/ArtistActions';

const base = Rebase.createClass('https://guestar.firebaseio.com');

const GuestarAPI = {

  getArtistsData() {
  	base.listenTo('artists', {
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
  }
	
};

export default GuestarAPI;
