import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const CLASS_NAME = '.weather-conditions';

const MOCK = Ember.Object.create({
  country: { code: 'US', name: 'United States' },
  date: new Date('Tue May 30 2017 18:00:00 GMT-0700 (PDT)'),
  description: 'Cloudy',
  icon: 'na.png',
  iconDescription: 'na',
  location: 'Portland',
  temperature: 17,
  windSpeed: 6
});

moduleForComponent('weather-conditions', 'Integration | Component | weather conditions', {
  integration: true
});

test('it displays the conditions', function(assert) {
  this.set('conditions', MOCK);

  this.render(hbs`{{weather-conditions conditions=conditions}}`);

  let icon = this.$(`${CLASS_NAME}-icon`);

  assert.equal(this.$(`${CLASS_NAME}-location`).text().trim(), MOCK.location,
    'The location is shown');

  assert.equal(this.$(`${CLASS_NAME}-country`).text().trim(), MOCK.country.name,
    'The country is shown');

  assert.equal(icon.attr('src'), `http://openweathermap.org/img/w/${MOCK.icon}`,
    'The icon source is correct');

  assert.equal(icon.attr('alt'), MOCK.iconDescription,
    'The icon alt text is correct');

  assert.equal(this.$(`${CLASS_NAME}-temperature`).text().trim(), `17 °C`,
    'The temperate is shown');

  assert.equal(this.$(`${CLASS_NAME}-summary`).text().trim(),
    `6:00 pm – ${MOCK.description} with winds of ${MOCK.windSpeed} kph.`);
});
