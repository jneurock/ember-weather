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

function getParamsFromId(id) {
  let latDashLonPattern = /^(-?[\d\.]+)-(-?[\d\.]+)$/;
  let latLon = id.match(latDashLonPattern);

  if (latLon) {
    return `lat=${latLon[1]}&lon=${latLon[2]}`;
  }

  return `q=${id.replace(/-/g, ',')}`;
}

export default DS.Adapter.extend({
  findRecord(store, type, id) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let params = getParamsFromId(id);

      Ember.$.getJSON(`api/conditions/?${params}`).then(function(data) {
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
