/*
 * LoginStore
 */

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter }  from 'events';
import LoginConstants  from '../constants/LoginConstants';

import _ from 'lodash';

let CHANGE_EVENT = 'changeLogin';

let _state = {
  user: React.addons.createFragment({})
};

let LoginStore = _.assign({}, EventEmitter.prototype, {

  getUser: function() {
    return _state.user;
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

    case LoginConstants.GET_WELCOME_USER:
      _getUser();
      LoginStore.emitChange();
    break;

    case LoginConstants.SET_USER_DATA:
      _setUser(action.user);
      LoginStore.emitChange();
    break;
  }

});

let _getUser = () => _state.user;

let _setUser = (data) => {
  _state.user = data;
};

export default LoginStore;
