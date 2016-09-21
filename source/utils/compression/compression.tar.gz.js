'use strict';

const Compression = require('./compression');
const tarGz = require('tar.gz');

module.exports = class CompressionTarGz extends Compression {
    _extract() {
        return tarGz()
            .extract(this._file, this._destination);
    }
};
