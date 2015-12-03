/*
 * ArtistStore
 */

'use strict';

import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants  from '../constants/AppConstants';
import BaseStore from './BaseStore';

const _state = {
  artist: React.addons.createFragment({})
};

const _setData = data => _state.artist = data;

const ArtistStore = _.assign({}, BaseStore, {

  getData() {
    return _state.artist;
  }

});

AppDispatcher.register(action => {

  switch(action.actionType) {
    case AppConstants.SET_ARTIST_DATA:
      _setData(action.artist);
      ArtistStore.emitChange();
      break;
  }

});

export default ArtistStore;
