'use strict';

const platformUtil = require('../utils/platform'); 
const VALID_VALUES = require('./config.constants').VALID_VALUES;
const VALIDATORS = [
	host,
	version,
	architecture,
	platform,
	type,
	buildFolder,
	tmpFolder,
	sourceFolder
];

module.exports = { validate: validate };

function validate(config) {
	VALIDATORS.forEach((validator) => {
		if (!validator(config)) {
			throw new Error(`invalid config: ${validator.name}`);
		}
	});
}

function host(config) {
	return /^https?.\/\//.test(config.host);
}

function version(config) {
	return /^v\d\.(1[3-9]|[2-9][0-9])\.\d(-(alpha|beta|rc)\d?)?$/.test(
		config.version
	);
}

function architecture(config) {
	if (platformUtil.isOsx(config.platform)) {
		return config.architecture === VALID_VALUES.architecture.x64;
	} else {
		return getValidValuesArray('architecture')
			.includes(config.architecture);
	}
}

function platform(config) {
	return getValidValuesArray('platform').includes(config.platform);
}

function type(config) {
	return getValidValuesArray('type').includes(config.type);
}

function buildFolder(config) {
	return isValidPath(config.buildFolder);
}

function tmpFolder(config) {
	return isValidPath(config.tmpFolder);
}

function sourceFolder(config) {
	return isValidPath(config.sourceFolder);
}

function isValidPath(path) {
	return typeof path === 'string' && path !== '';
}

function getValidValuesArray(key) {
	let values = VALID_VALUES[key];
	return Array.isArray(values) ? values : Object.values(values);
}
