module.exports = {
  name: { type: String },
  slug: { type: String },
  userStories: { link: 'user-story', inverse: 'project', isArray: true }
};
