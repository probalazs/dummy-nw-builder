'use strict';

const path = require('path');
const validator = require('./validator');
const NwConfig = require('./nw.config');
const CONFIG_CONSTANTS = require('./config.constants');

module.exports = class Config {
    constructor(userConfig) {
        this._config = this._getConfig(userConfig);
        this.nw = new NwConfig(this._config);
        this.folders = this._getFolders();
    }

    _getFolders() {
        let config = this._config;
        let build = path.join(
            config.buildFolder,
            `${config.platform}-${config.architecture}`
        );
        return Object.freeze({
            build: build,
            tmp: config.tmpFolder,
            source: config.sourceFolder
        });
    }

    _getConfig(userConfig) {
        let config = this._mergeUserAndDefaultConfig(userConfig);
        Object.freeze(config);
        this._validate(config);
        return config;
    }

    _mergeUserAndDefaultConfig(userConfig) {
        let filteredUserConfig = this._filter(userConfig);
        return Object.assign(
            {},
            CONFIG_CONSTANTS.DEFAULT_CONFIG,
            filteredUserConfig
        );
    }

    _validate(config) {
        validator.validate(config);
    }

    _filter(userConfig) {
        return CONFIG_CONSTANTS.USER_CONFIG_KEYS.reduce((filtered, key) => {
            if (userConfig[key]) {
                filtered[key] = userConfig[key];
            }
            return filtered;
        }, {});
    }
};
