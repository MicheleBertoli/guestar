/*
 * ArtistAPI
 */

'use strict';

import ArtistActions from '../actions/ArtistActions';

let ArtistAPI = {

	getData(id) {

		var obj = {  
		  method: 'GET',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  }
		}

		fetch('http://guestar.com/a/artists/' + id, obj)  
	  .then(function(res) {
	    return res.json();
	  })
	  .then(function(resJson) {
	  	resJson.bio = resJson.bio.substring(0, resJson.bio.indexOf("<br/><br/>"));
	    ArtistActions.setData(resJson);	
	  })

  }

};

export default ArtistAPI;
