'use strict';

const unzip = require('unzip');
const fs = require('fs');
const Promise = require('bluebird');
const Compression = require('./compression');

module.exports = class CompressionZip extends Compression {
    _extract() {
        return new Promise((resolve, reject) => {
            this._unzip()
                .on('error', reject)
                .on('finish', resolve);
        });
    }

    _unzip() {
        return fs.createReadStream(this._file)
            .pipe(unzip.Extract({ path: this._destination }));
    }
};
