const express = require('express');
const router = express.Router();

const routes = app => {
  router.get('/', (req, res) => {
    return app.render(req, res, '/gigs', { id: 'Test Gigs' });
    // res.send('hello')
  });

  return router;
};

module.exports = routes;
