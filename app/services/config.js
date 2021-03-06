import Ember from 'ember';

export default Ember.Service.extend({
  iconExtension: '.png',
  iconPrefix: 'http://openweathermap.org/img/w/',
  temperatureUnit: 'C',
  windUnit: 'kph'
});
