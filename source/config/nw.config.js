'use strict';

const CONFIG_CONSTANTS = require('./config.constants');
const platformUtil = require('../utils/platform');

module.exports = class NwConfig {
	get filename() {
		let parts = [
			CONFIG_CONSTANTS.NW_FILE_OPTIONS.prefix,
			this._config.version,
			this._config.platform,
			this._config.architecture
		];
		this._addNwTypeTo(parts);
		return parts.join('-');
	}
	
	get extension() {
		let extensions = CONFIG_CONSTANTS.NW_FILE_OPTIONS.extensions;
		return (platformUtil.isLinux(this._config.platform)) ?
			extensions.tarGz :
			extensions.zip;
	}

	get file() {
		return  `${this.filename}.${this.extension}`;
	}

	get url() {
		return [this._config.host, this._config.version, this.file].join('/');
	}

	constructor(userConfig) {
		this._config = this._getConfig(userConfig);
	}

	_getConfig(userConfig) {
		let config = Object.assign({}, userConfig);
		return Object.freeze(config);
	}

	_addNwTypeTo(parts) {
		if (!this._isNwTypeNormal()) {
			parts.splice(1, 0, this._config.type);
		}
		return parts;
	}

	_isNwTypeNormal() {
		return this._config.type === CONFIG_CONSTANTS.VALID_VALUES.type.normal;
	}

};
