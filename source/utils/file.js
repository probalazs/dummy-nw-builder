'use strict';

const Promise = require('bluebird');
const request = require('request');
const fs = Promise.promisifyAll(require('fs-extra'));
const path = require('path');

module.exports = {
    isDirectoryExist: isDirectoryExist,
    getAbsouluteOf: getAbsouluteOf,
    download: download
};

function isDirectoryExist(route) {
    return new Promise((resolve, reject) => {
        fs.statAsync(route)
            .then((stat) => (stat.isDirectory()) ? resolve() : reject())
            .error(reject);
    });
}

function getAbsouluteOf(route) {
    return (path.isAbsolute(route)) ? route : path.join(process.cwd(), route);
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
