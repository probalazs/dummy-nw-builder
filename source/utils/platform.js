'use strict';

const PLATFORMS = require('../config/config.constants').VALID_VALUES.platform;

module.exports = {
    isLinux: isPlatform.bind(null, PLATFORMS.linux),
    isWindows: isPlatform.bind(null, PLATFORMS.windows),
    isOsx: isPlatform.bind(null, PLATFORMS.osx)
};

function isPlatform(required, toBeTested) {
    return required === toBeTested;
}

