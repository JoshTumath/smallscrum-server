'use strict';

const express = require('express');
const Fortune = require('fortune');
const JsonApiSerializer = require('fortune-json-api');
const routes = require('./routes');

/**
 * Creates an express.js server for serving a static website (such as one built
 * using Ember) with JSON API for client-server communication.
 * @param  {Fortune} store  A fortune.js store object with configuration details
 *                          of the database.
 * @param  {String} rootDir The root directory of the server (can be determined
 *                          with the `__dirname` variable)
 * @return {app}            An express.js app instance
 */
module.exports = (store, rootDir) => {
  const app = express();

  // The location from which the Ember application will be served
  app.use(express.static(rootDir + '/public'));

  app.use('/api', Fortune.net.http(store, {
    // Set all fortune.js communications to be done using JSON API
    serializers: [[JsonApiSerializer, {
      prefix: 'api'
    }]]
  }));

  app.use('/', routes(rootDir));

  return app;
};
