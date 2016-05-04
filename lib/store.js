const config = require('../config/environment');
const Fortune = require('fortune');
const MongodbAdapter = require('fortune-mongodb');

module.exports = new Fortune({
  'project': {
    name: { type: String },
    slug: { type: String },

    supportTickets: { link: 'support-ticket', inverse: 'project', isArray: true },
    userStories: { link: 'user-story', inverse: 'project', isArray: true },
    assignedUsers: { link: 'user', inverse: 'projects', isArray: true }
  },

  'support-ticket': {
    name: { type: String },
    description: { type: String },
    complete: { type: Boolean },
    urgent: { type: Boolean },
    creationDate: { type: Date },

    project: { link: 'project', inverse: 'supportTickets' },
    user: { link: 'user', inverse: 'supportTickets' }
  },

  'user-story': {
    name: { type: String },
    acceptanceCriteria: { type: String },
    complete: { type: Boolean },

    project: { link: 'project', inverse: 'userStories' }
  },

  'user': {
    email: { type: String },
    password: { type: String },
    firstName: { type: Boolean },
    lastName: { type: Boolean },

    projects: { link: 'project', inverse: 'assignedUsers', isArray: true },
    supportTickets: { link: 'project', inverse: 'user', isArray: true }
  }
}, {
  adapter: [
    MongodbAdapter, {
      url: config.DB.URL
    }
  ]
});
