import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { PDX } from '../../mocks/conditions';

const CLASS_NAME = '.weather-conditions';

moduleForComponent('weather-conditions', 'Integration | Component | weather conditions', {
  integration: true
});

test('it displays the conditions', function(assert) {
  this.set('conditions', PDX);

  this.render(hbs`{{weather-conditions conditions=conditions}}`);

  let icon = this.$(`${CLASS_NAME}-icon`);

  assert.equal(this.$(`${CLASS_NAME}-location`).text().trim(), PDX.location,
    'The location is shown');

  assert.equal(this.$(`${CLASS_NAME}-country`).text().trim(), PDX.country.name,
    'The country is shown');

  assert.equal(icon.attr('src'), `http://openweathermap.org/img/w/${PDX.icon}`,
    'The icon source is correct');

  assert.equal(icon.attr('alt'), PDX.iconDescription,
    'The icon alt text is correct');

  assert.equal(this.$(`${CLASS_NAME}-temperature`).text().trim(), `17 °C`,
    'The temperate is shown');

  assert.equal(this.$(`${CLASS_NAME}-summary`).text().trim(),
    `6:00 pm – ${PDX.description} with winds of ${PDX.windSpeed} kph.`);
});
