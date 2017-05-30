import Ember from 'ember';

export default Ember.Service.extend({
  iconPrefix: 'http://openweathermap.org/img/w/',
  temperatureUnit: 'C',
  windUnit: 'kph'
});
