import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let storeStub = Ember.Service.extend({
  findAll() {
    return Ember.RSVP.Promise.resolve([{
      id: 'US',
      name: 'United States'
    }]);
  }
});

moduleForComponent('weather-card-new', 'Integration | Component | weather card new', {
  integration: true,

  beforeEach() {
    this.register('service:store', storeStub);

    this.inject.service('store');
  }
});

test('it shows the edit form on click', function(assert) {
  assert.expect(2);

  this.render(hbs`{{weather-card-new}}`);

  this.$('.weather-card-new-empty').click();

  assert.equal(this.$('.weather-card-new-form').length, 1, 'The form is shown');
  assert.equal(this.$('.weather-card-new-empty').length, 0, 'The add icon is hidden');
});

test('it can cancel the edit', function(assert) {
  assert.expect(3);

  this.render(hbs`{{weather-card-new}}`);

  this.$('.weather-card-new-empty').click();

  assert.equal(this.$('.weather-card-new-form').length, 1, 'The form is shown');

  this.$('.weather-card-new-cancel').click();

  assert.equal(this.$('.weather-card-new-form').length, 0, 'The form is hidden');
  assert.equal(this.$('.weather-card-new-empty').length, 1, 'The add icon is shown');
});

test('the submit button is disabled by default', function(assert) {
  assert.expect(1);

  this.render(hbs`{{weather-card-new}}`);

  this.$('.weather-card-new-empty').click();

  assert.ok(this.$('.weather-card-new-submit[disabled]').length,
    'The submit button is disabled');
});

test('the submit button is enabled with location and country selection', function(assert) {
  assert.expect(1);

  this.render(hbs`{{weather-card-new}}`);

  this.$('.weather-card-new-empty').click();
  this.$('.weather-card-new-input').val('90210').trigger('input');
  this.$('.weather-card-new-select').val('US').change();

  assert.notOk(this.$('.weather-card-new-submit[disabled]').length,
    'The submit button is enabled');
});
