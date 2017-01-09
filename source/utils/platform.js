'use strict';

module.exports = {
    isLinux: isPlatform.bind(null, 'linux'),
    isWindows: isPlatform.bind(null, 'win32'),
    isOsx: isPlatform.bind(null, 'darwin')
};

function isPlatform(required, toBeTested) {
    return required === toBeTested;
}

