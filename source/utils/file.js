'use strict';

const Promise = require('bluebird');
const request = require('request');
const fs = require('fs');

module.exports = {
    createFolderSync: createFolderSync,
    download: download
};

function createFolderSync(folder) {
    if (!_isFolderExist(folder)) {
        fs.mkdirSync(folder);
    }
}

function download(url, destination) {
    return new Promise((resolve, reject) => {
        request.get(url)
            .on('error', reject)
            .pipe(fs.createWriteStream(destination))
            .on('finish', resolve);
    });
}

function _isFolderExist(folder) {
    try {
        let stat = fs.statSync(folder);
        return stat.isDirectory();
    } catch (e) {
        return false;
    }
}
