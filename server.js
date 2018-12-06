const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const mongoose = require('mongoose');
const config = require('./lib/config');
const logger = require('./lib/logger');
const utils = require('./lib/utils');
const router = require('./lib/router');
const port = config.application.port || process.env.PORT;

config.db.connectionURL()
	.then(connectionURL => {
		mongoose.connect(connectionURL, { useNewUrlParser: true });
	});

app.set('secret', config.application.secret);
app.set('config', config.application);

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('combined', { stream: logger.stream }));

router.load(app);

app.use((req, res) => {
	res.status(404).json({error: '404: Page not Found'});
});

app.use(utils.errorHandler);

// start server
app.listen(port, ()=>{
	logger.info('Server started')
});