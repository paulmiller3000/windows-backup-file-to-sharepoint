const fs = require('fs');
const moment = require('moment');

const copyFileToLocalBackup = (sourceFile, destinationFile) => {	
	return new Promise( (resolve, reject) => {
		fs.copyFile(sourceFile, destinationFile, (err) => {
			result = 'success';

			if (err) result = 'fail';

			resolve(result);
		})
	})
}

/*const copyFileToSharePoint = (sourceFile, destinationFile) => {
	return new Promise( (resolve, destinationFile) => {
		fs.copyFile(sourceFile, backup, (err) => {
			result = 'success';

			if (err) result = 'fail';

			resolve(result);
		})
	})
}*/

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

const makeSubFolder = (folder) => {	
	return new Promise( (resolve, reject) => {		

		fs.mkdir(folder, { recursive: true }, (err) => {						
			if (err) {
				result = (err === 'EEXIST') ? true : false;
			} else {
				result = true;				
			}
			
			resolve(result)
		})

	})
}

module.exports = {
	copyFileToLocalBackup: copyFileToLocalBackup,
	isLockFilePresent: isLockFilePresent,
	lastModified: lastModified,
	makeSubFolder: makeSubFolder
}