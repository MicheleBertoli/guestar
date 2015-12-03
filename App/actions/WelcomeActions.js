/*
 * WelcomeActions
 */

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const WelcomeActions = {

  setWelcomeData(artists) {
    AppDispatcher.dispatch({
      actionType: AppConstants.SET_WELCOME_DATA,
      artists: artists
    });
  }

};

export default WelcomeActions;
