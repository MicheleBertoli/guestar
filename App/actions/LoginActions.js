/*
 * LoginActions
 */

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import LoginConstants from '../constants/LoginConstants';

let LoginActions = {

	getUser() {
		AppDispatcher.dispatch({
  		actionType: LoginConstants.GET_USER_DATA
  	});
  }

  setUser(data) {
		AppDispatcher.dispatch({
  		actionType: LoginConstants.SET_USER_DATA,
  		user: data
  	});
  }
  
};

export default LoginActions;
