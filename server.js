const express = require('express');
const Fortune = require('fortune');
const jsonApiSerializer = require('fortune-json-api');
const routes = require('./app/routes');
const store = require('./app/store');

const app = express();
const port = process.env.PORT || 3000;

// Configuration ///////////////////////////////////////////////////////////////
// The location from which the Ember application will be served
app.use(express.static(__dirname + '/public'));

// Set all fortune.js communications to be done using JSON API
app.use('/api', Fortune.net.http(store, {
  serializers: [[jsonApiSerializer, {
    prefix: 'api'
  }]]
}));

// Routes //////////////////////////////////////////////////////////////////////
routes(app, __dirname);

// Listen //////////////////////////////////////////////////////////////////////
store.connect().then(() => {
  app.listen(port, () => {
    console.log('Listening on port ' + port);
  });
});

module.exports = app;
