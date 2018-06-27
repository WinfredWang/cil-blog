const childProcess = require('child_process');

let dbPath = process.env['npm_package_config_mongodb_dbpath'];
let cwd = process.env['npm_package_config_mongodb_cwd'];

if (!dbPath) {
    throw new Error('please config mongodb path');
}

if (!cwd) {
    throw new Error('please config mongodb cwd');
}

const bat = childProcess.exec(`mongod.exe -dbpath=${dbPath}`, { cwd: cwd });
bat.stdout.on('data', (data) => {
    console.log(data.toString());
});

bat.stderr.on('data', (data) => {
    console.log(data.toString());
});

bat.on('exit', (code) => {
    console.log(`Mongodb exit：${code}`);
});