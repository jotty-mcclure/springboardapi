const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');
// usage: node lib/generate user

if ( process.argv[2] && pluralize.isSingular(process.argv[2]) ) {
    const singular = process.argv[2].toLocaleLowerCase();
    const singular_capitalized = singular.charAt(0).toUpperCase() + singular.slice(1);
    const plural = pluralize(singular);
    const plural_url = plural.replace(/\s+/g, '-');
    const plural_capitalized = plural.charAt(0).toUpperCase() + plural.slice(1);
    
    const newApiDir = path.join(__dirname,'../../api/', singular);
    const templateDir = path.join(__dirname,'./_template');

    fs.mkdirSync(newApiDir);
    fs.readdirSync(templateDir)
        .forEach(file => {
            const newPath = path.join(newApiDir, file);

            fs.copyFileSync(
                path.join(templateDir, file),
                newPath
            );

            let data = fs.readFileSync(newPath, 'utf8')
                            .replace(/{{singular_capitalized}}/g, singular_capitalized)
                            .replace(/{{plural_url}}/g, plural_url);

            fs.writeFileSync(newPath, data, 'utf8');
        });
}