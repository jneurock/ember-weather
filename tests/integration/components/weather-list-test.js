import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('weather-list', 'Integration | Component | weather list', {
  integration: true
});

test('it renders n weather cards plus 1 new card', function(assert) {
  assert.expect(2);

  let empty = {};

  this.set('weatherConditions', [empty, empty]);

  this.render(hbs`{[weather-conditions]}`);

  assert.equal(this.$('.weather-card').length, 2, 'There are 2 cards');
  assert.equal(this.$('.weather-card-new').length, 1, 'There is 1 new card');
});

test('it accepts valid additions to the list', function(assert) {
  assert.expect(2);

  this.render(hbs`{[weather-conditions]}`);

  this.$('.weather-card-new').click();

  this.$('.weather-card-input').val('97201');
  this.$('.weather-card-country option:eq(235)').prop('selected', true);

  this.$('.weather-card-submit').click();

  wait().then(() => {
    assert.equal(this.$('.weather-card').length, 1, 'The card was added');
    assert.equal(this.$('.weather-card-new').length, 1, 'There is 1 new card');
  });
});

test('it rejects invalid additions to the list', function(assert) {
  assert.expect(1);

  this.render(hbs`{[weather-conditions]}`);

  this.$('.weather-card-new').click();

  this.$('.weather-card-input').val('00000');

  this.$('.weather-card-submit').click();

  wait().then(() => {
    assert.equal(this.$('.weather-card-error').length, 1, 'The invalid card was not added');
    assert.equal(this.$('.weather-card').length, 0, 'There are no added cards');
  });
});
