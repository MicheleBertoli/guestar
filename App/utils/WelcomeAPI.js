/*
 * WelcomeAPI
 */

'use strict';

import WelcomeActions from '../actions/WelcomeActions';

let WelcomeAPI = {

	getData() {

		var obj = {  
		  method: 'GET',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  }
		}

		fetch('https://api.github.com/users/octocat/gists', obj)  
	  .then(function(res) {
	    return res.json();
	  })
	  .then(function(resJson) {
	    WelcomeActions.setData(resJson[2].url);	
	  })

  }

};

export default WelcomeAPI;
