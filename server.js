var appData = require('./package.json');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var path = require('path');
var fs = require('fs');

var port = process.env.port || 8080;
var env = process.env.NODE_ENV || 'development';

var appEnvData = {
  version: appData.version,
  env: env
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('index.html'));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', './');

//index url
app.get('/', function(req, res) {
  res.render('index', appEnvData);
});

//on 404 error
app.get('*', function(req, res) {
  res.status(404).send('Unfortunately we can\'t find this page :(');
});

app.listen(port);

console.log(env.toUpperCase() + ' server is up and running at port: ' + port);
