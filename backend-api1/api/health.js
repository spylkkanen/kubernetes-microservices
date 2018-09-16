const express = require('express');
const routes = express.Router();

//
// GET /api/health
routes
.get('/api/health', function (req, res, next) {
  res.type('application/json');
  res.status(200).send();
})

module.exports = routes;
