import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('weather-card-new', 'Integration | Component | weather card new', {
  integration: true
});

test('it shows the edit form on click', function(assert) {
  assert.expect(2);

  this.render(hbs`{{weather-card-new}}`);

  this.$('.weather-card-add').click();

  assert.equal(this.$('.weather-card-edit').length, 1, 'The form is shown');
  assert.equal(this.$('.weather-card-add').length, 0, 'The add icon is hidden');
});

test('it can cancel the edit', function(assert) {
  assert.expect(3);

  this.render(hbs`{{weather-card-new}}`);

  this.$('.weather-card-add').click();

  assert.equal(this.$('.weather-card-edit').length, 1, 'The form is shown');

  this.$('.weather-card-cancel').click();

  assert.equal(this.$('.weather-card-edit').length, 0, 'The form is hidden');
  assert.equal(this.$('.weather-card-add').length, 1, 'The add icon is shown');
});
