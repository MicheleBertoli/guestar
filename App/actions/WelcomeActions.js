/*
 * WelcomeActions
 */

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import WelcomeConstants from '../constants/WelcomeConstants';

let WelcomeActions = {

  getWelcomeMessage() {
    AppDispatcher.dispatch({
      actionType: WelcomeConstants.GET_WELCOME_MESSAGE
    });
  },

  setWelcomeMessage(message) {
    AppDispatcher.dispatch({
      actionType: WelcomeConstants.SET_WELCOME_MESSAGE,
      message: message
    });
  }

};

export default WelcomeActions;
