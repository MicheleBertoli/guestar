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

const _setArtists = artists => _state.artists = artists.reverse();

const WelcomeStore = _.assign({}, BaseStore, {

  getArtists() {
    return _state.artists;
  }

});

AppDispatcher.register(action => {

  switch(action.actionType) {
    case AppConstants.GET_ARTISTS_SUCCESS:
      _setArtists(action.artists);
      WelcomeStore.emitChange();
      break;
  }

});

export default WelcomeStore;
