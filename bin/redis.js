var cmd = require('./bat')

let cwd = process.env['npm_package_config_redis'];
if (!cwd) {
    throw new Error('please config redis cwd');
}
cmd("redis-server", cwd);