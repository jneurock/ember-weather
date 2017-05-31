import Ember from 'ember';

const GEO_LOC_NA_ERR = 'Your specific location is unavailable at this time.';
const GEO_LOC_TIMEOUT_ERR = 'It took too long to load your specific location.';
const GEO_LOC_ERR_TRANSITION_TIME = 250;
const GEO_LOC_ERR_DISPLAY_TIME = 10000;

export default Ember.Controller.extend({
  geoLocationError: null,

  transitionGeoLocationError() {
    return new Ember.RSVP.Promise(resolve => {
      let $error = Ember.$('.header-geo-location-error');

      setTimeout(() => {
        $error.addClass('.header-geo-location-error-out');
        resolve($error);
      }, GEO_LOC_ERR_DISPLAY_TIME);
    });
  },

  actions: {
    geoLocationFail(positionError) {
      if (positionError.code === 2) {
        this.set('geoLocationError', GEO_LOC_NA_ERR);
      } else if (positionError.code === 3) {
        this.set('geoLocationError', GEO_LOC_TIMEOUT_ERR);
      }

      this.transitionGeoLocationError().then($error => {
        $error.removeClass('.header-geo-location-error-out');

        setTimeout(() => {
          this.set('geoLocationError', null);
        }, GEO_LOC_ERR_TRANSITION_TIME);
      });
    }
  }
});
