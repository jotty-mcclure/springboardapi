var express 	= require('express'),
	app         = express(),
	bodyParser  = require('body-parser'),
	bcrypt		= require('bcrypt'),
	helmet		= require('helmet'),
	morgan      = require('morgan'),
	mongoose    = require('mongoose'),
	promise		= require('bluebird'),
	config		= require('./_config');

// configuration
var port = process.env.PORT || config.env[config.mode].port;
mongoose.connect(config.env[config.mode].database, { useMongoClient: true, promiseLibrary: promise });
mongoose.Promise = promise;

app.set('secret', config.env[config.mode].secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('dev'));

// routes
require('./api/routes')(app, config);

// start server
app.listen(port);
console.log('server started on http://localhost:' + port);
