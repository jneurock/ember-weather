import Ember from 'ember';
import { shortTime } from '../util/date-time';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  classNames: 'weather-conditions',
  conditions: null,
  config: inject.service(),

  iconURL: computed('conditions.icon', function() {
    let extension = this.get('config.iconExtension');
    let icon = this.get('conditions.icon');
    let prefix = this.get('config.iconPrefix');

    return `${prefix}${icon}${extension}`;
  }),

  summary: computed('conditions.temperature', function() {
    let description = this.get('conditions.description');
    let time = shortTime(this.get('conditions.date'));
    let winds = this.getWinds();

    return `${time} – ${description} with ${winds}.`;
  }),

  getWinds() {
    let speed = this.get('conditions.windSpeed');

    if (speed === 0) {
      return 'calm winds';
    }

    return `winds of ${speed}&nbsp;${this.get('config.windUnit')}`;
  }
});
