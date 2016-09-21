'use strict';

const Config = require('./config/config');
const NwDownloader = require('./nw.downloader');

module.exports = class Builder {
    constructor(userConfig) {
        this._config = new Config(userConfig);
    }

    build() {
        return this._download();
    }

    _download() {
        let downloader = new NwDownloader(this._config);
        return downloader.download();
    }
};
