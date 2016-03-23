const request = require('supertest');

const MIME_TYPE = 'application/vnd.api+json';

/**
 * A factory for creating supertests that have been pre-configured to use the
 * JSON API.
 */
module.exports = {
  /**
   * Creates a GET request test with the expectations for the JSON API.
   * @param  {Function|Server} server server running the JSON API handler
   * @param  {String}          path   URL path to API to be tested (not
   *                                  including the /api/ prefix)
   * @return {Test}
   */
  get(server, path) {
    return () => request(server)
      .get(`/api/${path}`)
      .set('Accept', MIME_TYPE)
      .expect('Content-Type', MIME_TYPE);
  }
};
