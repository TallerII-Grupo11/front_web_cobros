var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '/dist/spotifiuby-cobros')));

app.get('/*', function(req, res) {
  res.

sendFile(path.join(__dirname + '/dist/spotifiuby-cobros/index.html'));
});

app.listen(process.env.PORT || 8080, function () {
  console.log('App started');
});