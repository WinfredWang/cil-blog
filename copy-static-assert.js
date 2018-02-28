var shell = require('shelljs');
var path = require('path');
var chokidar = require('chokidar');

const config = {
    sourceDir: 'src/client', // 静态资源根目录
    destDir: 'dist/client',  // 复制目标目录
    exclude: [  // 哪些目录不复制，当前只支持第一层目录
        'js',
        'ts',
        'components'
    ]
}

shell.mkdir('-p', path.join(__dirname, config.destDir));
let rootDir = path.join(__dirname, config.sourceDir);

let files = shell.ls(rootDir);
for (let file of files) {
    if (!exclude(file)) {
        let source = path.join(config.sourceDir, file);
        shell.cp('-R', source, path.join(config.destDir, file));
    }
}

let args = process.argv;
if (args.length >= 3 && args[2].indexOf('-w') == 0) {
    setTimeout(watchAndCp, 2000);
}

function exclude(filePath) {
    filePath = getRelPath(filePath);

    for (let e of config.exclude) {
        if (e == filePath) {
            return true
        }
    }

    return false;
}

function getRelPath(filePath) {
    filePath = path.normalize(filePath);
    let rootDir = path.join(__dirname, config.sourceDir);
    if (filePath.indexOf(rootDir) == 0) {
        return filePath.substring(rootDir.length + 1);
    }
    return filePath;
}

function watchAndCp() {
    console.log('Listening.......')
    chokidar.watch(rootDir, { ignored: '*.ts', ignoreInitial: true }).on('add', (filePath) => {
        copy(filePath);
    }).on('change', (filePath) => {
        copy(filePath);
    }).on('unlink', filePath => {
        del(filePath)
    });
}

function copy(filePath) {
    if (!exclude(filePath)) {
        let relPath = getRelPath(filePath);
        shell.cp('-R', filePath, path.join(config.destDir, relPath));
        console.log(`File ${filePath} has been copy to dist`);
    }
}

function del(filePath) {
    if (!exclude(filePath)) {
        let relPath = getRelPath(filePath);
        let destPath = path.join(config.destDir, relPath);
        shell.rm('-r', destPath);
        console.log(`File ${destPath} has been removed`);
    }
}
