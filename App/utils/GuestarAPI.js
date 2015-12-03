/*
 * GuestarAPI
 */

'use strict';

import Rebase from 're-base';
import WelcomeActions from '../actions/WelcomeActions';
import ArtistActions from '../actions/ArtistActions';

const base = Rebase.createClass('https://guestar.firebaseio.com');

let GuestarAPI = {

  getArtistsData() {
  	base.listenTo('artists', {
	    context: this,
	    asArray: true,
	    queries: {
	    	orderByChild: 'id'
	    },
	    then(artists){
	      WelcomeActions.setWelcomeData(artists);
	    }
	  });
  },

  getArtistData(id) {
  	base.fetch('artists/' + id, {
	    context: this,
	    asArray: false,
	    then(artist){
	      ArtistActions.setData(artist);
	    }
	  });
  }
	
};

export default GuestarAPI;
