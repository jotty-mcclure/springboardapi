const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./_config');
const logger = require('./lib/logger');
const middleware = require('./lib/middleware');
const router = require('./lib/router');

// configuration
var port = config.port || process.env.PORT;

mongoose.connect(config.database, { useNewUrlParser: true });

app.set('secret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('combined', { stream: logger.stream }));

app.use(middleware.responseFormatter);

router.load(app, config);

app.use((req, res) => {
	console.log(req.path);
	res.status(404).json({error: '404: Page not Found'});
});

// start server
app.listen(port, ()=>{
	logger.info('Server started')
});