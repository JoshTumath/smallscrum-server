'use strict';

const expectations = require('./helpers/json-api-expectations');
const RequestFactory = require('./helpers/json-api-request-factory');
const store = require('../app/store');
const serverSetup = require('./helpers/server-setup');

describe('/api/projects', function () {
  let app;

  before('setup server', function (done) {
    app = serverSetup.create(store, done);
  });

  after('teardown server', function (done) {
    serverSetup.destroy(done);
  });

  describe('GET', function () {
    let apiRequest;

    before(function () {
      apiRequest = RequestFactory.get(app, 'projects');

      return store.request({
        type: 'project',
        method: 'create',
        payload: [
          { name: 'Cardigan Bay Holiday Homes', slug: 'cardigan-bay-holiday-homes' },
          { name: 'Aberystwyth Garages', slug: 'aberystwyth-garages' },
          { name: 'NNP Letting Agency', slug: 'nnp' },
          { name: 'AUCU', slug: 'aberystwyth-cu' },
          { name: 'Borth College', slug: 'borth-college' }
        ]
      });
    });

    after(function (done) {
      // Delete everything in the collection once we're done
      store.adapter.db.collection('project').deleteMany({}, done);
    });

    it('should respond to GET /api/projects', function (done) {
      apiRequest().expect(200, done);
    });

    it('should list all projects', function (done) {
      apiRequest()
      .expect(expectations.containsDataArray())
      .expect(expectations.containsAttribute('name', 'Cardigan Bay Holiday Homes'))
      .expect(expectations.containsAttribute('slug', 'cardigan-bay-holiday-homes'))
      .expect(expectations.containsAttribute('name', 'Aberystwyth Garages'))
      .expect(expectations.containsAttribute('slug', 'aberystwyth-garages'))
      .expect(expectations.containsAttribute('name', 'NNP Letting Agency'))
      .expect(expectations.containsAttribute('slug', 'nnp'))
      .expect(expectations.containsAttribute('name', 'AUCU'))
      .expect(expectations.containsAttribute('slug', 'aberystwyth-cu'))
      .expect(expectations.containsAttribute('name', 'Borth College'))
      .expect(expectations.containsAttribute('slug', 'borth-college'))
      .expect(200, done);
    });
  });
});
