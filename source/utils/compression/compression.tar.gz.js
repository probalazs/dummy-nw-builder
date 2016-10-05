'use strict';

const Promise = require('bluebird');
const Compression = require('./compression');
const targz = Promise.promisifyAll(require('targz'));

module.exports = class CompressionTarGz extends Compression {
    _extract() {
        return targz.decompressAsync({
            src: this._file,
            dest: this._destination
        });
    }
};
