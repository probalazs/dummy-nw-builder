'use strict';

const Promise = require('bluebird');
const path = require('path');
const file = require('./utils/file');

module.exports = class NwDownloader {
    constructor(config) {
        this._config = config;
        this._destination = this._getDestination();
        this._createDownloadFolder();
    }

    download() {
        if (file.isFileExist(this._destination)) {
            return Promise.resolve();
        } else {
            return file.download(this._config.nw.url, this._destination);
        }
    }

    _getDestination() {
        return path.join(this._config.folders.tmp, this._config.nw.file);
    }

    _createDownloadFolder() {
        file.mkdirWithParents(this._config.folders.tmp);
    }
};
