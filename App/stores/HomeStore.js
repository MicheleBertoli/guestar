/*
 * HomeStore
 */

'use strict';

import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants  from '../constants/AppConstants';
import BaseStore from './BaseStore';

const _state = {
  isLoading: false
};

const _setLoading = (isLoading) => _state.isLoading = isLoading;

const HomeStore = _.assign({}, BaseStore, {

  isLoading() {
    return _state.isLoading;
  }

});

AppDispatcher.register(action => {

  switch(action.actionType) {
    case AppConstants.GET_ARTISTS_DATA:
      _setLoading(true);
      HomeStore.emitChange();
      break;
    case AppConstants.GET_ARTISTS_DATA_SUCCESS:
      _setLoading(false);
      HomeStore.emitChange();
      break;
  }
  
});

export default HomeStore;
