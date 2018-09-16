const express = require('express');
const routes = express.Router();

//
// GET /api/message
routes
.get('/api/message', function (req, res, next) {
  res.type('application/json');

  console.log("Service 2 was called.");

  var data = { 
    message: "This is message from service 2."
  }  

  res.status(200).send(data)
})

module.exports = routes;
