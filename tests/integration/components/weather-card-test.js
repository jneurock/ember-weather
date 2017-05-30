import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('weather-card', 'Integration | Component | weather card', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{weather-card}}`);

  assert.equal(this.$('.weather-card').length, 1, 'The weather card is shown');
  assert.equal(this.$('.weather-card-remove').length, 1,
    'The remove button is shown');
});
