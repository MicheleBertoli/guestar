/*
 * HomeActions
 */

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const HomeActions = {

  setLogged(isLogged) {
		AppDispatcher.dispatch({
  		actionType: AppConstants.SET_LOGGED,
  		isLogged: isLogged
  	});
  },

  setLoading(isLoading) {
		AppDispatcher.dispatch({
  		actionType: AppConstants.SET_LOADING,
  		isLoading: isLoading
  	});
  }
  
};

export default HomeActions;
