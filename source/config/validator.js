'use strict';

const platformUtil = require('../utils/platform'); 
const VALID_VALUES = require('./config.constants').VALID_VALUES;
const VALIDATORS = [
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

function version(config) {
	return /^v\d\.(1[3-9]|[2-9][0-9])\.\d(-(alpha|beta|rc)\d?)?$/.test(
		config.version
	);
}

function architecture(config) {
	return (platformUtil.isOsx(config.platform)) ?
		config.architecture === VALID_VALUES.architecture.x64 :
		isIncludes(VALID_VALUES.architecture, config.architecture);
}

function platform(config) {
	return isIncludes(VALID_VALUES.platform, config.platform);
}

function type(config) {
	return isIncludes(VALID_VALUES.type, config.type);
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

function isIncludes(group, value) {
	let values = getGroupValues(group);
	return values.includes(value);
}

function getGroupValues(group) {
	return Array.isArray(group) ? group : Object.values(group);
}
