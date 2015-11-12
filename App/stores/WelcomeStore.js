/*
 * WelcomeStore
 */

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter }  from 'events';
import WelcomeConstants  from '../constants/WelcomeConstants';

import _ from 'lodash';

let CHANGE_EVENT = 'changeWelcome';

let _state = {
  message: 'Welcome to React Native'
};

let WelcomeStore = _.assign({}, EventEmitter.prototype, {

  getMessage: function() {
    return _state.message;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case WelcomeConstants.SET_WELCOME_MESSAGE:
      _setStateMessage(action.message);
      WelcomeStore.emitChange();
    break;
  }

});

let _getStateMessage = () => _state.message;

let _setStateMessage = (message) => {
  _state.message = message;
};

export default WelcomeStore;
