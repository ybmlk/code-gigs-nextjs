const express = require('express');
const next = require('next');
const path = require('path');
const db = require('./config/database');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Test DB connection
db.authenticate()
  .then(() => console.log('Database connected successfully...'))
  .catch(err => console.log(`Error: ${err}`));

app.prepare().then(() => {
  const server = express();

  // Bodyparser middleware
  server.use(express.json());

  server.get('/a', (req, res) => {
    return app.render(req, res, '/a', { id: 'test' });
  });

  server.get('/b', (req, res) => {
    return app.render(req, res, '/b', req.query);
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
