const env = process.env.NODE_ENV || 'development';

const config = {
	'development': {
		'database': 'mongodb://dbo:123456@127.0.0.1:27017/fpm?authSource=admin',
		'port': 3001,
		'apiUrlBasePath': '/api/v1',
		'secret': '__P92knmi^&8hi0_(*&3#EFtgji^6t7gybhHU%$5yg32#E%^U963r'
	},
	'production': {
		'database': 'mongodb://dbo:123456@127.0.0.1:27017/fpm?authSource=admin',
		'port': 3001,
		'apiUrlBasePath': '/api/v1',
		'secret': '__P92knmi^&8hi0_(*&3#EFtgji^6t7gybhHU%$5yg32#E%^U963r'
	}
};

module.exports = config[env];