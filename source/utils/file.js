'use strict';

const Promise = require('bluebird');
const request = require('request');
const fs = Promise.promisifyAll(require('fs-extra'));
const path = require('path');

module.exports = {
    isFileExist: isFileExist,
    isDirectoryExist: isDirectoryExist,
    download: download
};

function isDirectoryExist(route) {
    let stat = _getFsStat(route);
    return stat.isDirectory instanceof Function && stat.isDirectory();
}

function isFileExist(route) {
    let stat = _getFsStat(route);
    return stat.isFile instanceof Function && stat.isFile();
}

function _getFsStat(route) {
    try {
        return fs.statSync(route);
    } catch (e) {
        return {};
    }
}

function download(url, destination) {
    let downloadDir = path.parse(destination).dir;
    return fs.ensureDirAsync(downloadDir)
        .then(() => _downloadFile(url, destination));
}

function _downloadFile(url, destination) {
    return new Promise((resolve, reject) => {
        request.get(url)
            .on('error', reject)
            .pipe(fs.createWriteStream(destination))
            .on('finish', resolve);
    });
}
