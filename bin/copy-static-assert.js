var shell = require('shelljs');
var path = require('path');
var chokidar = require('chokidar');

let cwd = process.cwd();

const config = {
    sourceDir: 'src/client', // 静态资源根目录
    destDir: 'dist/client',  // 复制目标目录
    exclude: [  // 哪些目录不复制，当前只支持第一层目录
        'js',
        'ts',
        'components'
    ]
}

let destDir = path.join(cwd, config.destDir);
let srcDir = path.join(cwd, config.sourceDir);

shell.mkdir('-p', destDir);

let files = shell.ls(srcDir);
for (let file of files) {
    if (!exclude(file)) {
        let srcFile = path.join(srcDir, file);
        let destFile = path.join(destDir, file);
        shell.rm('-r', destFile);
        shell.cp('-r', srcFile, destFile);
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
    if (filePath.indexOf(srcDir) == 0) {
        return filePath.substring(srcDir.length + 1);
    }
    return filePath;
}

function watchAndCp() {
    console.log('Listening.......')
    chokidar.watch(srcDir, { ignored: '*.ts', ignoreInitial: true }).on('add', (filePath) => {
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
