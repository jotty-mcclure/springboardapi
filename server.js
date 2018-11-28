var express 	= require('express'),
	app         = express(),
	bodyParser  = require('body-parser'),
	bcrypt		= require('bcrypt'),
	helmet		= require('helmet'),
	morgan      = require('morgan'),
	mongoose    = require('mongoose'),
	promise		= require('bluebird'),
	config		= require('./_config'),
	fs			= require('fs');

// configuration
var port = config.port || process.env.PORT;

mongoose.connect(config.database, { useNewUrlParser: true });

app.set('secret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('dev'));

// routes
fs.readdirSync('./api')
	.filter(itm => fs.lstatSync(`./api/${itm}`).isDirectory() && itm.charAt(0) !== '_')
	.forEach(api => {
		app.use(`${config.apiUrlBasePath}/`, require(`./api/${api}/routes`));
	});

// start server
app.listen(port);
//console.log('server started on http://localhost:' + port);
