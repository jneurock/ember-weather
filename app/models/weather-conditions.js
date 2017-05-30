import DS from 'ember-data';

export default DS.Model.extend({
  country: DS.belongsTo('country'),
  date: DS.attr('date'),
  description: DS.attr(),
  icon: DS.attr(),
  iconDescription: DS.attr(),
  location: DS.attr(),
  temperature: DS.attr('number'),
  windSpeed: DS.attr('number')
});
