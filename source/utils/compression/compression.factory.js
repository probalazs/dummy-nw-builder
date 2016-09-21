'use strict';

const EXTENSIONS =
    require('../../config/config.constants').NW_FILE_OPTIONS.extensions;
const CompressionZip = require('./compression.zip');
const CompressionTarGz = require('./compression.tar.gz');

module.exports = { create: create };

function create(file, destination) {
    let extension = _getExtension(file);
    let compressionClass = _getCompressionClass(extension);
    return new compressionClass(file, destination);
}

function _getExtension(file) {
    return Object.values(EXTENSIONS)
        .find((extension) => _isExtensionMatch(`.${extension}`, file));
}

function _isExtensionMatch(extension, file) {
    return extension === file.substr(-extension.length);
}

function _getCompressionClass(extension) {
    return {
        [EXTENSIONS.zip]: CompressionZip,
        [EXTENSIONS.tarGz]: CompressionTarGz
    }[extension];
}
