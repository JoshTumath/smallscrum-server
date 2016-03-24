'use strict';

const jsonapi = require('./helpers/json-api-request-factory');
const server = require('../server');

describe('/api/userStories', function () {
  describe('GET', function () {
    let request;

    before(function () {
      request = jsonapi.get(server, 'userStories');
    });

    it('should respond to GET /api/userStories', function (done) {
      request().expect(200, done);
    });

    // TODO: test for listing projects by seeding the database
  });
});
