const ENV = require('../config/environment');
const Fortune = require('fortune');
const mongodbAdapter = require('fortune-mongodb');

module.exports = new Fortune({
  project: require('./models/project'),
  userStory: require('./models/user-story')
}, {
  adapter: [
    mongodbAdapter, {
      url: ENV.DB.URL
    }
  ]
});
