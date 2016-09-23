'use strict';

const clone = require('clone');
const path = require('path');
const file = require('../utils/file');

module.exports = class FoldersConfig {
    get tmp() {
        return file.getAbsouluteOf(this._config.tmpFolder);
    }

    get source() {
        return file.getAbsouluteOf(this._config.sourceFolder);
    }

    get build() {
        let build = path.join(
            this._config.buildFolder,
            `${this._config.platform}-${this._config.architecture}`
        );
        return file.getAbsouluteOf(build);
    }

    get nw() {
        return path.join(this.tmp, this._nw.filename);
    }

    constructor(config, nw) {
        this._config = clone(config);
        this._nw = clone(nw);
    }
};
