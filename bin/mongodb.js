const childProcess = require('child_process');
const bat = childProcess.exec('mongod.exe -dbpath=E:/mongodb',
    { cwd: "C:\\Program Files\\MongoDB\\Server\\3.4\\bin" });

bat.stdout.on('data', (data) => {
    console.log(data.toString());
});

bat.stderr.on('data', (data) => {
    console.log(data.toString());
});

bat.on('exit', (code) => {
    console.log(`Mongodb exit：${code}`);
});