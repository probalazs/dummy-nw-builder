'use strict';

const Config = require('./../config/config');
const NwDownloader = require('./nw.downloader');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs-extra'));
const merge = require('./merge');

module.exports = class Builder {
    constructor(userConfig) {
        this._config = new Config(userConfig);
    }

    build() {
        return this._download()
            .then(() => this._clearBuildFolder())
            .then(() => merge(this._config));
    }

    _download() {
        let downloader = new NwDownloader(this._config);
        return downloader.download();
    }

    _clearBuildFolder() {
        return fs.emptyDirAsync(this._config.folders.build);
    }
};
