import { module, test } from 'qunit';
import { shortTime } from 'weather/util/date-time';

module('Unit | Util | date time');

test('it formats short times correctly', function(assert) {
  assert.expect(3);

  let sixPm = new Date('Tue May 30 2017 18:00:00 GMT-0700 (PDT)');
  let eleven59am = new Date('Tue May 30 2017 11:59:00 GMT-0700 (PDT)');
  let midnight = new Date('Tue May 30 2017 00:00:00 GMT-0700 (PDT)');

  assert.equal(shortTime(sixPm), '6:00 pm', '6:00 pm');
  assert.equal(shortTime(eleven59am), '11:59 am', '11:59 am');
  assert.equal(shortTime(midnight), '12:00 am', '12:00 am');
});
