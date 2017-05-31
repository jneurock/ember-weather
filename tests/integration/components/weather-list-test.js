import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { PDX, LAX } from '../../mocks/conditions';

let storeStub = Ember.Service.extend({
  findAll() {
    return Ember.RSVP.Promise.resolve([{
      id: 'US',
      name: 'United States'
    }]);
  },

  findRecord(type, id) {
    if (id === '00000-US') {
      return Ember.RSVP.Promise.reject('Could not find location');
    }

    return Ember.RSVP.Promise.resolve(PDX);
  }
});

moduleForComponent('weather-list', 'Integration | Component | weather list', {
  integration: true,

  beforeEach() {
    this.register('service:store', storeStub);

    this.inject.service('store');
  }
});

test('it renders n weather cards plus 1 new card', function(assert) {
  assert.expect(2);

  this.set('weatherConditions', [ PDX, LAX ]);

  this.render(hbs`{{weather-list weatherConditions=weatherConditions}}`);

  assert.equal(this.$('.weather-card').length, 2, 'There are 2 cards');
  assert.equal(this.$('.weather-card-new').length, 1, 'There is 1 new card');
});

test('it accepts valid additions to the list', function(assert) {
  assert.expect(2);

  this.render(hbs`{{weather-list}}`);

  this.$('.weather-card-new-empty').click();
  this.$('.weather-card-new-input').val('97201').trigger('input');
  this.$('.weather-card-new-select').val('US').change();
  this.$('.weather-card-new-submit').click();

  assert.equal(this.$('.weather-card').length, 1, 'The card was added');
  assert.equal(this.$('.weather-card-new').length, 1, 'There is 1 new card');
});

test('it rejects invalid additions to the list', function(assert) {
  assert.expect(2);

  this.render(hbs`{{weather-list}}`);

  this.$('.weather-card-new-empty').click();
  this.$('.weather-card-input').val('00000').trigger('input');
  this.$('.weather-card-select').val('US').change();
  this.$('.weather-card-submit').click();

  assert.equal(this.$('.weather-card-new-input-error').length, 1,
    'The invalid card was not added');
  assert.equal(this.$('.weather-card').length, 0, 'There are no added cards');
});
