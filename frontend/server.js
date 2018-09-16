// Load in modules.
var express = require('express');
var app = express();

// Serve static content from working directory (or '.') by default
var staticContentDir = process.argv[2] || __dirname;
console.log(`### Content dir = '${staticContentDir}'`);

// Serve all static content (index.html, js, css, assets, etc.)
app.use('/', express.static(staticContentDir));

// Handle config request.
app.get('/api/config', function (req, res) {
    var data = {
        service1endpoint: process.env.SERVICE_API1_ENDPOINT || 9010
    };

    res.send(data);
});

// Redirect all other requests to index.html.
app.use('*', function(req, res) {
   res.sendFile(`${staticContentDir}/index.html`);
});

// Start the Express server.
var port = process.env.PORT || 19000;
var server = app.listen(port, function () {
    var port = server.address().port;
    console.log(`### Server listening on ${server.address().port}`);
});
