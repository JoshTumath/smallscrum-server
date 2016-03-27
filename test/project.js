'use strict';

const jsonapi = require('./helpers/json-api-request-factory');
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
    let request;

    before(function () {
      request = jsonapi.get(app, '');
    });

    it('should respond to GET /api/projects', function (done) {
      request().expect(200, done);
    });

    it('should list all projects', function (done) {
      store.adapter.create('project', {
        'name': 'Foo',
        'slug': 'foo'
      })
      .then(() => store.adapter.create('project', {
        'name': 'Bar',
        'slug': 'bar'
      }))
      .catch((error) => done(error))
      .then(() => request().expect(200, {
        'data': [
          {
            name: 'Foo',
            slug: 'foo'
          }, {
            name: 'Bar',
            slug: 'bar'
          }
        ],
        'links': {
          'projects': 'api/projects',
          'userStories': 'api/userStories'
        },
        'meta': {
          'count': 0
        }
      }, done));
    });
  });
});
