module.exports = (app, root) => {
  app.get('*', (req, res) => {
    res.sendFile(root + '/public/index.html');
  });
};
