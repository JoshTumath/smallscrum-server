const express = require('express');
const routes = require('./app/routes');

const app = express();
const port = process.env.PORT || 3000;

// Configuration ///////////////////////////////////////////////////////////////
// The location from which the Ember application will be served
app.use(express.static(__dirname + '/public'));

// Routes //////////////////////////////////////////////////////////////////////
routes(app, __dirname);

// Listen //////////////////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log('Listening on port ' + port);
});

module.exports = app;
