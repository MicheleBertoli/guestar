/*
 * HomeStore
 */

'use strict';

import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants  from '../constants/AppConstants';
import BaseStore from './BaseStore';

const _state = {
  isLogged: false,
  isLoading: false
};

const _setLogged = (isLogged) => {
  _state.isLogged = isLogged;
};

const _setLoading = (isLoading) => {
  _state.isLoading = isLoading;
};

const HomeStore = _.assign({}, BaseStore, {

  isLogged() {
    return _state.isLogged;
  },

  isLoading() {
    return _state.isLoading;
  }

});

AppDispatcher.register(action => {

  switch(action.actionType) {
    case AppConstants.SET_LOGGED:
      _setLogged(action.isLogged);
      HomeStore.emitChange();
      break;
    case AppConstants.SET_LOADING:
      _setLoading(action.isLoading);
      HomeStore.emitChange();
      break;
  }
  
});

export default HomeStore;
