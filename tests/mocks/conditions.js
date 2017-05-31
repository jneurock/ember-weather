import Ember from 'ember';

export const LAX = Ember.Object.create({
  country: { code: 'US', name: 'United States' },
  date: new Date('Tue May 30 2017 17:45:00 GMT-0700 (PDT)'),
  description: 'Sunny',
  icon: 'na.png',
  iconDescription: 'na',
  location: 'Los Angeles',
  temperature: 22,
  windSpeed: 2
});

export const PDX = Ember.Object.create({
  country: { code: 'US', name: 'United States' },
  date: new Date('Tue May 30 2017 18:00:00 GMT-0700 (PDT)'),
  description: 'Cloudy',
  icon: 'na.png',
  iconDescription: 'na',
  location: 'Portland',
  temperature: 17,
  windSpeed: 6
});
