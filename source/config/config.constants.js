'use strict';

module.exports = Object.freeze({
	VALID_VALUES: {
		type: {
			normal: 'normal',
			sdk: 'sdk'
		},
		platform: {
			linux: 'linux',
			osx: 'osx',
			windows: 'win'
		},
		architecture: {
			x64: 'x64',
			ia32: 'ia32'
		}
	},
	DEFAULT_CONFIG: {
		host: 'https://dl.nwjs.io',
		version: '',
		architecture: '',
		type: 'normal',
		buildFolder: './build',
		tmpFolder: './tmp',
		platform: ''
	}
});
