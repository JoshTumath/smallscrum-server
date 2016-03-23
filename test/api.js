'use strict';

const jsonapi = require('./helpers/json-api-request-factory');
const server = require('../server');

describe('/api/', function () {
  describe('GET', function () {
    let request;

    before(function () {
      request = jsonapi.get(server, '');
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
  });
});
