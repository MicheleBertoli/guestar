/*
 * HomeStore
 */

'use strict';

import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants  from '../constants/AppConstants';
import BaseStore from './BaseStore';

const _state = {
  isLoading: false,
  user: null
};

const _setLoading = (isLoading) => _state.isLoading = isLoading;
const _setUser = (user) => _state.user = user;

const HomeStore = _.assign({}, BaseStore, {

  isLoading() {
    return _state.isLoading;
  },

  getUser() {
    return _state.user;
  }

});

AppDispatcher.register(action => {

  switch(action.actionType) {
    case AppConstants.LOGIN_USER:
      _setLoading(true);
      HomeStore.emitChange();
      break;
    case AppConstants.LOGIN_USER_SUCCESS:
      _setLoading(false);
      _setUser(action.user);
      HomeStore.emitChange();
      break;
    case AppConstants.LOGIN_USER_FAIL:
      _setLoading(false);
      _setUser(null);
      HomeStore.emitChange();
      break;
    case AppConstants.LOGOUT_USER_SUCCESS:
      _setLoading(false);
      _setUser(null);
      HomeStore.emitChange();
      break;  
    case AppConstants.GET_ARTISTS:
      _setLoading(true);
      HomeStore.emitChange();
      break;
    case AppConstants.GET_ARTISTS_SUCCESS:
      _setLoading(false);
      HomeStore.emitChange();
      break;
    case AppConstants.GET_LOCATIONS:
      _setLoading(true);
      HomeStore.emitChange();
      break;
    case AppConstants.GET_LOCATIONS_SUCCESS:
      _setLoading(false);
      HomeStore.emitChange();
      break;
    case AppConstants.CREATE_LOCATION:
      _setLoading(true);
      HomeStore.emitChange();
      break;
    case AppConstants.CREATE_LOCATION_SUCCESS:
      _setLoading(false);
      HomeStore.emitChange();
      break;
  }
  
});

export default HomeStore;
