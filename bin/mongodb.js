var cmd = require('./bat')

let dbPath = process.env['npm_package_config_mongodb_dbpath'];
let cwd = process.env['npm_package_config_mongodb_cwd'];

if (!dbPath) {
    throw new Error('please config mongodb path');
}

if (!cwd) {
    throw new Error('please config mongodb cwd');
}
cmd(`mongod.exe -dbpath=${dbPath}`, cwd);