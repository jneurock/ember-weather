import Ember from 'ember';
import DS from 'ember-data';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  classNames: 'weather-card-new',
  classNameBindings: 'isEditing::weather-card-new-add',
  countries: null,
  country: '',
  inputError: null,
  isEditing: false,
  location: '',
  store: inject.service(),

  init() {
    this._super(...arguments);

    this.set('countries', DS.PromiseArray.create({
      promise: this.get('store').findAll('country')
    }));
  },

  cannotSubmit: computed('country', 'inputError', 'location', function() {
    let country = this.get('country');
    let inputError = this.get('inputError');
    let location = this.get('location');

    return !country || inputError || !location.trim();
  }),

  actions: {
    add() {
      this.set('isEditing', true);
    },

    cancel() {
      this.set('isEditing', false);
    },

    countryChanged() {
      this.set('country', this.$('.weather-card-new-select').val());
    },

    locationChanged() {
      this.set('location', this.$('.weather-card-new-input').val());
      this.set('inputError', null);
    },

    submit() {
      let result = this.get('submit')();
    }
  }
});
