import Ember from 'ember';

const { inject } = Ember;

const GEO_LOC_TIMEOUT = 5000;

export default Ember.Component.extend({
  store: inject.service(),

  classNames: 'weather-list',
  weatherConditions: [],

  init() {
    this._super(...arguments);

    this.getGeoLocation();
  },

  getGeoLocation() {
    if (!Ember.testing) {
      navigator.geolocation.getCurrentPosition(
        position => this.geoLocationSuccess(position),
        positionError => this.geoLocationFail(positionError),
        { timeout: GEO_LOC_TIMEOUT }
      );
    }
  },

  geoLocationSuccess(position) {
    let { latitude, longitude } = position.coords;
    let latLonAsId = `${latitude.toFixed(6)}-${longitude.toFixed(6)}`;

    this.get('store').findRecord('weather-conditions', latLonAsId)
      .then(conditions =>  this.get('weatherConditions')
        .pushObject(conditions));
  },

  geoLocationFail(positionError) {
    this.get('positionError')(positionError);
  },

  actions: {
    addCard(location, country) {
      let id = `${location}-${country}`;

      return this.get('store').findRecord('weather-conditions', id)
        .then(conditions => this.get('weatherConditions')
          .pushObject(conditions));
    },

    removeCard(conditions) {
      this.get('weatherConditions').removeObject(conditions);
    }
  }
});
