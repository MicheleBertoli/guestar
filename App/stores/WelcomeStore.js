/*
 * WelcomeStore
 */

'use strict';

import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants  from '../constants/AppConstants';
import BaseStore from './BaseStore';

const _state = {
  artists: []
};

const _setArtists = artists => _state.artists = artists;

const WelcomeStore = _.assign({}, BaseStore, {

  getArtists() {
    return _state.artists;
  }

});

AppDispatcher.register(action => {

  switch(action.actionType) {
    case AppConstants.SET_WELCOME_DATA:
      _setArtists(action.artists);
      WelcomeStore.emitChange();
      break;
  }

});

export default WelcomeStore;
