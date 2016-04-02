'use strict';

const expectations = require('./helpers/json-api-expectations');
const RequestFactory = require('./helpers/json-api-request-factory');
const store = require('../app/store');
const serverSetup = require('./helpers/server-setup');

describe('/api/userStories', function () {
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
      apiRequest = RequestFactory.get(app, 'userStories');

      return store.request({
        type: 'project',
        method: 'create',
        payload: [
          { name: 'Cardigan Bay Holiday Homes', slug: 'cardigan-bay-holiday-homes' }
        ]
      }).then((res) => {
        const projectId = res.payload.records[0].id;

        return store.request({
          type: 'userStory',
          method: 'create',
          payload: [
            { name: 'As a test, I want to work so that I can pass', project: projectId },
            { name: 'As a foo, I want to bar so that I can baz', project: projectId },
            { name: 'As a A, I want to B so that I can C', project: projectId },
            { name: 'As a 1, I want to 2 so that I can 3', project: projectId }
          ]
        });
      });
    });

    after(function (done) {
      // Delete everything in the collection once we're done
      store.adapter.db.collection('project').deleteMany({}, () => {
        store.adapter.db.collection('userStory').deleteMany({}, done);
      });
    });

    it('should respond to GET /api/userStories', function (done) {
      apiRequest().expect(200, done);
    });

    it('should list all user stories', function (done) {
      apiRequest()
      .expect(expectations.containsDataArray())
      .expect(expectations.containsAttribute('name', 'As a test, I want to work so that I can pass'))
      .expect(expectations.containsAttribute('name', 'As a foo, I want to bar so that I can baz'))
      .expect(expectations.containsAttribute('name', 'As a A, I want to B so that I can C'))
      .expect(expectations.containsAttribute('name', 'As a 1, I want to 2 so that I can 3'))
      .expect(expectations.containsRelationship('project'))
      .expect(200, done);
    });
  });
});
