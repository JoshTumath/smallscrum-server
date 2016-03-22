module.exports = {
  name: { type: String },
  slug: { type: String },
  project: { link: 'project', inverse: 'userStories' }
};
