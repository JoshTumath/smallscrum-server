'use strict';

const jsonapi = require('./helpers/json-api-request-factory');
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
    let request;

    before(function () {
      request = jsonapi.get(app, '');
    });

    it('should respond to GET /api/userStories', function (done) {
      request().expect(200, done);
    });

    // TODO: test for listing projects by seeding the database
  });
});
