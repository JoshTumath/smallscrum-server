'use strict';

const request = require('supertest');
const store = require('../lib/store');
const serverSetup = require('./helpers/server-setup');

const MIME_TYPE = 'application/json; charset=utf-8';

describe('/token', function () {
  let app;

  before('setup server', function (done) {
    app = serverSetup.create(store, done);
  });

  after('teardown server', function (done) {
    serverSetup.destroy(done);
  });

  describe('POST', function () {
    it('should respond', function (done) {
      request(app)
        .post('/token')
        .expect(400, done);
    });

    it('should error when invalid grant type used', function (done) {
      request(app)
        .post('/token')
        .send('grant_type=foo')
        .send('username=test@example.com')
        .send('password=password')
        .expect('Content-Type', MIME_TYPE)
        .expect(400, {
          'error': 'unsupported_grant_type'
        }, done);
    });

    it('should error when incorrect login username used', function (done) {
      request(app)
        .post('/token')
        .send('grant_type=password')
        .send('username=foo@bar.com')
        .send('password=foo')
        .expect('Content-Type', MIME_TYPE)
        .expect(400, {
          'error': 'invalid_grant'
        }, done);
    });

    it('should succeed when correct login used', function (done) {
      request(app)
        .post('/token')
        .send('grant_type=password')
        .send('username=test@example.com')
        .send('password=password')
        .expect('Content-Type', MIME_TYPE)
        .expect(200, {
          'access_token': 'secret_token'
        }, done);
    });
  });
});
