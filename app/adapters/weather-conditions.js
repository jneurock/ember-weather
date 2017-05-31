import Ember from 'ember';
import DS from 'ember-data';

/**
 * Adapt data from the OpenWeatherMap API. See
 * [this page](https://openweathermap.org/current) for response details.
 */
function adapt(data, id) {
  try {
    let weather = data.weather[0];

    return {
      country: data.sys.country,
      date: data.dt * 1000,
      description: weather.main,
      icon: weather.icon,
      iconDescription: weather.description,
      id,
      location: data.name,
      temperature: data.main.temp,
      windSpeed: data.wind.speed
    };
  } catch(ex) {
    return ex;
  }
}

function formatId(id) {
  return id.replace(/-/g, ',');
}

export default DS.Adapter.extend({
  findRecord(store, type, id) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let formattedId = formatId(id);

      Ember.$.getJSON(`api/conditions/?q=${formattedId}`).then(function(data) {
        let adaptedData = adapt(data, id);

        if (adaptedData instanceof Error) {
          reject(adaptedData);
        } else {
          resolve(adaptedData);
        }
      }, function(jqXHR) {
        reject(jqXHR);
      });
    });
  }
});
