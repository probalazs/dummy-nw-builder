'use strict';

const Config = require('./config/config');
const NwDownloader = require('./nw.downloader');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs-extra'));

module.exports = class Builder {
    constructor(userConfig) {
        this._config = new Config(userConfig);
    }

    build() {
        return this._download()
            .then(() => this._clearBuildFolder())
            .then(() => this._merge());
    }

    _download() {
        let downloader = new NwDownloader(this._config);
        return downloader.download();
    }

    _merge() {
        return Promise.all(this._copy());
    }

    _clearBuildFolder() {
        return fs.emptyDirAsync(this._config.folders.build);
    }

    _copy() {
        let copySources = this._getCopySources();
        return copySources.map((source) => {
            return fs.copyAsync(source, this._config.folders.build);
        });
    }

    _getCopySources() {
        return [
            this._config.folders.nw,
            this._config.folders.source
        ];
    }
};
