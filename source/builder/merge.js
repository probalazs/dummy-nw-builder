'use strict';

const Promise = require('bluebird');
const path = require('path');
const fs = Promise.promisifyAll(require('fs-extra'));
const platform = require('./../utils/platform');

module.exports = (config) => {
    return Promise.all(copy(config));
};

function getCopyPairs(config) {
    return [
        { source: config.folders.nw, destination: config.folders.build },
        {
            source: config.folders.source,
            destination: getSourceDestination(config.folders.build)
        }
    ];
}

function getSourceDestination(buildFolder) {
    return (platform.isOsx(process.platform)) ?
        path.join(buildFolder, 'nwjs.app', 'Contents', 'Resources', 'app.nw') :
        buildFolder;
}

function copy(config) {
    return getCopyPairs(config)
        .map((files) => fs.copyAsync(files.source, files.destination));
}
