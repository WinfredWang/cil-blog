var shell = require('shelljs');
var path = require('path');

shell.mkdir('-p', path.join(__dirname, 'dist/public'))

shell.cp('-R', 'src/public/css', 'dist/public/css');
shell.cp('-R', 'src/public/images', 'dist/public/images');
shell.cp('-R', 'src/public/admin.html', 'dist/public/admin.html');
shell.cp('-R', 'src/public/index.html', 'dist/public/index.html');
shell.cp('-R', 'src/public/user.html', 'dist/public/user.html');