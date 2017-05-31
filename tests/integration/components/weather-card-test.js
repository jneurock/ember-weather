import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { PDX } from '../../mocks/conditions';

moduleForComponent('weather-card', 'Integration | Component | weather card', {
  integration: true
});

test('it renders', function(assert) {
  this.set('conditions', PDX);

  this.set('actions', { removeCard() {} });

  this.render(hbs`{{weather-card conditions=conditions remove=(action "removeCard")}}`);

  assert.equal(this.$('.weather-card').length, 1, 'The weather card is shown');
  assert.equal(this.$('.weather-card-remove').length, 1,
    'The remove button is shown');
});

test('it fires the remove event', function(assert) {
  assert.expect(1);

  let done = assert.async();

  this.set('conditions', PDX);

  this.set('actions', {
    removeCard() {
      assert.ok(true, 'The remove event was fired');
      done();
    }
  });

  this.render(hbs`{{weather-card conditions=conditions remove=(action "removeCard")}}`);

  this.$('.weather-card-remove').click();
});
