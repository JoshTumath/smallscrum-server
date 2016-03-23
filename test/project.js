'use strict';

const jsonapi = require('./helpers/json-api-request-factory');
const server = require('../server');

describe('/api/projects', function () {
  describe('GET', function () {
    let request;

    before(function () {
      request = jsonapi.get(server, 'projects');
    });

    it('should respond to GET /api/projects', function (done) {
      request().expect(200, done);
    });

    // TODO: test for listing projects by seeding the database
  });
});
