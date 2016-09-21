'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs-extra'));
const compressionFactory = require('./utils/compression/compression.factory');
const path = require('path');
const file = require('./utils/file');

module.exports = class NwDownloader {
    constructor(config) {
        this._config = config;
        this._destination = this._getDestination();
    }

    _getDestination() {
        return path.join(this._config.folders.tmp, this._config.nw.file);
    }

    download() {
        return new Promise((resolve) => {
            this._isNwExist()
                .catch(() => this._startDownload())
                .finally(resolve);
        });
    }

    _isNwExist() {
        return file.isDirectoryExist(this._config.folders.nw);
    }

    _startDownload() {
        return file.download(this._config.nw.url, this._destination)
            .then(() => this._extract())
            .then(() => this._clear());
    }

    _extract() {
        let compression = compressionFactory.create(
            this._destination,
            this._config.folders.tmp
        );
        return compression.extract();
    }

    _clear() {
        return fs.unlinkAsync(this._destination);
    }
};
