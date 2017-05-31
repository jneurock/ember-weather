import { moduleForModel, test } from 'ember-qunit';

moduleForModel('weather-conditions', 'Unit | Model | weather conditions', {
  needs: [ 'model:country' ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
