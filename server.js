'use strict';

const server = require('./app');
const Fortune = require('fortune');
const store = require('./app/store');

const port = process.env.PORT || 3000;

// Set up the server
const app = server(store, __dirname);

// Wait until database connection is set up before setting up server port
store.connect().then(() => {
  app.listen(port, () => {
    console.log('Listening on port ' + port);
  });
});
