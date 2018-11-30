var express 	= require('express'),
	app         = express(),
	bodyParser  = require('body-parser'),
	helmet		= require('helmet'),
	morgan      = require('morgan'),
	mongoose    = require('mongoose'),
	config		= require('./_config'),
	middleware 	= require('./lib/middleware'),
	router		= require('./lib/router');

// configuration
var port = config.port || process.env.PORT;

mongoose.connect(config.database, { useNewUrlParser: true });

app.set('secret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('dev'));

app.use(middleware.isAuthenticated);
app.use(middleware.responseFormatter);

router.load(app, config);

// start server
app.listen(port);
//console.log('server started on http://localhost:' + port);