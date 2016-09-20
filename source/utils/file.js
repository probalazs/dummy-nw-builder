'use strict';

const Promise = require('bluebird');
const request = require('request');
const fs = require('fs');
const path = require('path');

module.exports = {
    mkdirWithParents: mkdirWithParents,
    download: download
};

function mkdirWithParents(folder) {
    _mkdirParent(folder);
    if (!_isDirectoryExist(folder)) {
        fs.mkdirSync(folder);
    }
}

function _mkdirParent(route) {
    let parent = _getParentDirectory(route);
    if (!_isDirectoryExist(parent)) {
        mkdirWithParents(parent);
    }
}

function _getParentDirectory(route) {
    return path.parse(route).dir;
}

function _isDirectoryExist(folder) {
    try {
        let stat = fs.statSync(folder);
        return stat.isDirectory();
    } catch (e) {
        return false;
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
