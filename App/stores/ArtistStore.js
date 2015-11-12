/*
 * ArtistStore
 */

'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter }  from 'events';
import ArtistConstants  from '../constants/ArtistConstants';

import _ from 'lodash';

let CHANGE_EVENT = 'changeArtist';

let _state = {
  artist: React.addons.createFragment({})
};

let ArtistStore = _.assign({}, EventEmitter.prototype, {

  getData: function() {
    return _state.artist;
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

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case ArtistConstants.SET_ARTIST_DATA:
      _setData(action.artist);
      ArtistStore.emitChange();
    break;
  }

});

// Private Functions
let _setData = (data) => {
  _state.artist = data;
};

export default ArtistStore;
