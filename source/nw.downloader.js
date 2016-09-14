'use strict';

const path = require('path');
const file = require('./utils/file');

module.exports = class NwDownloader {
    constructor(config) {
        this._config = config;
    }

    download() {
        let destination = this._getDestination;
        return file.downloadFileFromUrl(this._config.nw.url, destination);
    }

    _getDestination() {
        let config = this._config;
        let destination = path.join(config.folders.tmp, config.nw.file);
        file.createFolderSync(this._config.folders.tmp);
        return destination;
    }
};
