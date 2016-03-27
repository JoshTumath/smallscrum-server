'use strict';

const jsonapi = require('./helpers/json-api-request-factory');
const store = require('../app/store');
const serverSetup = require('./helpers/server-setup');

describe('/api/', function () {
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

    it('should respond to GET /api/', function (done) {
      request().expect(200, done);
    });

    it('should respond to GET /api/ again', function (done) {
      request().expect(200, done);
    });

    it('should list available APIs', function (done) {
      request().expect(200, {
        'links': {
          'projects': 'api/projects',
          'userStories': 'api/userStories'
        }
      }, done);
    });

    it('should respond with a 404 error to a non-existant API', function (done) {
      jsonapi.get(app, 'foobarbaz')().expect(404, done);
    });
  });
});
