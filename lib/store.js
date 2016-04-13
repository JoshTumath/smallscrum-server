const config = require('../config/environment');
const Fortune = require('fortune');
const MongodbAdapter = require('fortune-mongodb');

module.exports = new Fortune({
  project: require('./models/project'),
  userStory: require('./models/user-story')
}, {
  adapter: [
    MongodbAdapter, {
      url: config.DB.URL
    }
  ]
});
