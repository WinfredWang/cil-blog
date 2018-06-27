const childProcess = require('child_process');

module.exports = function (cmd, cwd) {
    const bat = childProcess.exec(cmd, { cwd: cwd });
    bat.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    bat.stderr.on('data', (data) => {
        console.log(data.toString());
    });

    bat.on('exit', (code) => {
        console.log(`Mongodb exit：${code}`);
    });
}

