'use strict';

const https = require('https');
const fs = require('fs');

const HTTP_STATUS_OK = 200;

module.exports = {
	createFolderSync: createFolderSync,
	downloadFileFromUrl: downloadFileFromUrl
};

function createFolderSync(folder) {
	if (!_isFolderExist(folder)) {
		fs.mkdirSync(folder);
	}
}

function downloadFileFromUrl(url, destination) {
	let destinationStream = fs.createWriteStream(destination);
	return new Promise(function(resolve, reject) {
		https.get(url, (response) => {
				if (_isOkStatus(response)) {
					let streams = {
						destination: destinationStream,
						response: response
					};
					_copyFileToDestination(streams, resolve);
				} else {
					reject();
				}
			});
	});
}

function _copyFileToDestination(streams, ready) {
	streams.response.pipe(streams.destination);
	streams.destination.on('finish', () => {
		streams.destination.close(ready);
	});
}

function _isOkStatus(response) {
	return response.statusCode === HTTP_STATUS_OK;
}

function _isFolderExist(folder) {
	try {
		let stat = fs.statSync(folder);
		return stat.isDirectory();
	} catch (e) {
		return false;
	}
}
