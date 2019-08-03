const fs = require('fs');
const moment = require('moment');

const isLockFilePresent = (file) => {
	return new Promise( (resolve, reject) => {
		fs.access(file, fs.F_OK, (err) => {
			result = true;

			if (err) {
				result = false;
			}
			
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
	isLockFilePresent: isLockFilePresent,
	lastModified: lastModified
}