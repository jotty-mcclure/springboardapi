var express 	= require('express'),
	app         = express(),
	bodyParser  = require('body-parser'),
	bcrypt		= require('bcrypt'),
	helmet		= require('helmet'),
	cors		= require('cors'),
	morgan      = require('morgan'),
	mongoose    = require('mongoose'),
	promise		= require('bluebird'),
	nodemailer 	= require('nodemailer'),
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
app.use(cors({
	origin: function (origin, callback) {
		if (config.allowedOrigins == '*' || config.allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	}
}));
// email transporter config
app.locals.transporter = nodemailer.createTransport(config.env[config.mode].smtp);	

// routes
require('./api/routes')(app, config);

// start server
app.listen(port);
console.log('server started on http://localhost:' + port);