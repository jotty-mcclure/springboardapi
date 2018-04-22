var fs = require('fs'),
	templates = {};

templates.verifyEmail = function(replacementTokens) {
	var template = fs.readFileSync(__dirname+'/templates/verifyEmail.html', 'utf8');
	
	Object.keys(replacementTokens).forEach((k) => {
		template = template.replace(`{{${k}}}`, replacementTokens[k]);
	});
	
	return template;
}

module.exports = templates;