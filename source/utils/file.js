'use strict';

const Promise = require('bluebird');
const request = require('request');
const fs = require('fs');
const path = require('path');

module.exports = {
    mkdirWithParents: mkdirWithParents,
    isFileExist: isFileExist,
    isDirectoryExist: isDirectoryExist,
    download: download
};

function mkdirWithParents(folder) {
    _mkdirParent(folder);
    if (!isDirectoryExist(folder)) {
        fs.mkdirSync(folder);
    }
}

function _mkdirParent(route) {
    let parent = _getParentDirectory(route);
    if (!isDirectoryExist(parent)) {
        mkdirWithParents(parent);
    }
}

function _getParentDirectory(route) {
    return path.parse(route).dir;
}

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
    return new Promise((resolve, reject) => {
        request.get(url)
            .on('error', reject)
            .pipe(fs.createWriteStream(destination))
            .on('finish', resolve);
    });
}
