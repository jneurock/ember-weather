import Ember from 'ember';
import DS from 'ember-data';
import COUNTRIES from '../models/fixtures/countries';

export default DS.Adapter.extend({
  findAll() {
    return Ember.RSVP.Promise.resolve(COUNTRIES.map(country => ({
      id: country.code,
      name: country.name
    })));
  },

  findRecord(store, type, id) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let country = COUNTRIES.find(_country => _country.code === id);

      if (country) {
        resolve({
          id,
          name: country.name
        });
      } else {
        reject(`Unknown country code: ${id}`);
      }
    });
  }
});
