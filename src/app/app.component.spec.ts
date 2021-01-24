const express = require('express');
const http = require('http');
const app = express();
// Set name of directory where angular distribution files are stored
const dist = '../../../angularForm';

// Set port
const port = process.env.PORT || 4201;

// Serve static assets
app.get('*.*', express.static(dist, { maxAge: '1y' }));

// Serve application paths
app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, { root: dist });
});

// Create server to listen for connections
const server = http.createServer(app);
server.listen(port, () => console.log("Node Express server for " + app.name + " listening on port " + port));