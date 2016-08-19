'use strict';

const path = require('path');
const validator = require('./validator');
const platformUtil = require('../utils/platform');

const CONFIG_CONSTANTS = require('./config.constants'); 

module.exports = class Config {
	get folders() {
		return this._folders;
	}

	get nw() {
		return this._nw;
	}

	constructor(userConfig) {
		this._nw = '';
		this._folders = {};
		this._config = {};
		
		this._setConfig(userConfig);
		this._setNw();
		this._setFolders();
	} 

	_setFolders() {
		this._folders = Object.freeze({
			build: path.join(
				this._config.buildFolder,
				`${this._config.platform}-${this._config.architecture}`
			),
			tmp: this._config.tmpFolder,
			source: this._config.sourceFolder
		});
	}

	_setConfig(userConfig) {
		this._config = this._mergeUserAndDefaultConfig(userConfig);
		Object.freeze(this._config);
		this._validateConfig();
	}

	_validateConfig() {
		validator.validate(this._config);
	}

	_mergeUserAndDefaultConfig(userConfig) {
		return Object.assign({}, CONFIG_CONSTANTS.DEFAULT_CONFIG, userConfig);
	}

	_setNw() {
		let parts = this._getNwParts();
		parts.file = `${parts.filename}.${parts.extension}`;
		parts.url = [this._config.host, this._config.version, parts.file]
			.join('/');
		this._nw = Object.freeze(parts);
	}

	_getNwParts() {
		return {
			filename: this._getNwFilename(),
			extension: this._getNwFileExtension()
		};
	}

	_getNwFilename() {
		let parts = [
			CONFIG_CONSTANTS.NW_FILE_OPTIONS.prefix,
			this._config.version,
			this._config.platform,
			this._config.architecture
		];
		if (!this._isNwTypeNormal()) {
			parts.splice(1, 0, this._config.type);
		}
		return parts.join('-');
	}

	_isNwTypeNormal() {
		return this._config.type === CONFIG_CONSTANTS.VALID_VALUES.type.normal;
	}

	_getNwFileExtension() {
		let extensions = CONFIG_CONSTANTS.NW_FILE_OPTIONS.extensions;
		return (platformUtil.isLinux(this._config.platform)) ?
			extensions.tarGz :
			extensions.zip;
	}
};
