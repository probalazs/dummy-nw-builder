'use strict';

const file = require('../file');

module.exports = class Compression {
    constructor(compressedFile, destination) {
        this._file = compressedFile;
        this._destination = destination;
    }

    extract() {
        file.mkdirWithParents(this._destination);
        return this._extract();
    }
};
