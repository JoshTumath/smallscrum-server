'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const router = express.Router();

router.use(bodyParser.json({ type: 'application/*+json' }));
router.use(bodyParser.urlencoded({ extended: false }));

module.exports = (root) => {
  // XXX: Faking oauth until we have proper support
  router.post('/token', (req, res) => {
    if (req.body.grant_type !== 'password') {
      res.status(400).json({
        'error': 'unsupported_grant_type'
      });
      return;
    }

    if (!(req.body.username === 'test@example.com' && req.body.password === 'password')) {
      res.status(400).json({
        'error': 'invalid_grant'
      });
      return;
    }

    res.json({
      'access_token': 'secret_token'
    });
  });

  router.get('*', (req, res) => {
    res.sendFile(root + '/public/index.html');
  });

  return router;
};
