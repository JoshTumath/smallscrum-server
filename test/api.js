'use strict';

const RequestFactory = require('./helpers/json-api-request-factory');
const store = require('../lib/store');
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
      request = RequestFactory.get(app, '');
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
          'support-tickets': 'api/support-tickets',
          'user-stories': 'api/user-stories',
          'users': 'api/users',
        }
      }, done);
    });

    it('should respond with a 404 error to a non-existant API', function (done) {
      RequestFactory.get(app, 'foobarbaz')().expect(404, done);
    });
  });
});
