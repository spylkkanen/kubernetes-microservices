const http = require('http');
const parse = require('url-parse')
const express = require('express');
const routes = express.Router();

//
// GET /api/message
routes
.get('/api/message', function (req, res, next) {
  res.type('application/json');

  var data = { 
    service1: {
      message: "This is message from service 1."
    },
    service2: {
      message: null
    },
  }

  var service2endpoint = process.env.SERVICE_API2_ENDPOINT;
  var url = parse(service2endpoint, true);

  var options = {
    host: url.hostname,
    port: url.port,
    path: url.pathname + '/message'
  }

  console.log("Service 1 was called. Calling Service 2 => " + JSON.stringify(options));

  var req = http.get(options, function(response) {
    var body = '';
    response.on('data', function(d) {
        body += d;
    });
    response.on('end', function() {
      var service2responce = JSON.parse(body);
      data.service2.message = service2responce.message;

      console.log("Message received from service 2: " + JSON.stringify(data));
      res.status(200).send(data);
    });
  });

  req.on('error', function(e) {
    console.log("Message received from service 2. error=" + JSON.stringify(e));
    res.status(500).send({"error": "Something went wrong in service 2!"});
  });
})

module.exports = routes;
