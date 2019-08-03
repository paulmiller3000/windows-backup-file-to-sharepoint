const fs = require('fs');
const moment = require('moment');

const copyFileToLocalBackup = (file, backup) => {
	return new Promise( (resolve, reject) => {
		fs.copyFile(file, backup, (err) => {
			result = 'success';

			if (err) result = 'fail';

			resolve(result);
		})
	})
}

const isLockFilePresent = (file) => {
	return new Promise( (resolve, reject) => {
		fs.access(file, fs.F_OK, (err) => {
			result = true;

			if (err) result = false;
			
			resolve(result);
		})
	})
}

const lastModified = (file) => {
	return new Promise( (resolve, reject) => {
		fs.stat(file, function (err, stats) {
			if (err) {
				result = 'error';
			} else {
				const dateTimeStamp = moment(stats.mtime).format('YYYY-MM-DD') 
					+ '_'
					+ moment(stats.mtime).format('HHmm');
				result = dateTimeStamp;				
			}

			resolve(result);
		})

		
	})
}

module.exports = {
	copyFileToLocalBackup: copyFileToLocalBackup,
	isLockFilePresent: isLockFilePresent,
	lastModified: lastModified
}