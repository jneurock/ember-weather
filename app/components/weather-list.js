import Ember from 'ember';

const { inject } = Ember;

export default Ember.Component.extend({
  store: inject.service(),

  classNames: 'weather-list',
  weatherConditions: [],

  actions: {
    addCard(location, country) {
      let id = `${location}-${country}`;

      return this.get('store').findRecord('weather-conditions', id)
        .then(conditions => this.get('weatherConditions').pushObject(conditions));
    },

    removeCard(conditions) {
      this.get('weatherConditions').removeObject(conditions);
    }
  }
});
