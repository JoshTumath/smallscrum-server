module.exports = {
  name: { type: String },
  slug: { type: String },
  userStories: { link: 'userStory', inverse: 'project', isArray: true }
};
