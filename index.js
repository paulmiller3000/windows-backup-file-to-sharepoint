const config = require('./config/config.json');
const cron = require('node-cron');
const log = require('./components/log/log');
const file = require('./components/file/file');

const sourcePath = config.filepath.sourceFilePath;
const sourceFile = config.fileNames.fileToBackUp;
const localTargetPath = config.filepath.localBackupFilePath;
const lockFile = config.filepath.sourceFilePath + config.fileNames.lockFile;

log.logEntry('info', 'Service started');

const app = () => {

// https://stackoverflow.com/questions/10547974/how-to-install-node-js-as-windows-service
// Every minute for testing only; move timing to config eventually
/*const cronJob = cron.schedule('* * * * *', function() {
	console.log('Running task every minute');
})*/



// 1. Define time period in which to run job (e.g., between 8:00 p.m. and 11:00 p.m.). If current time is in that period, continue. Else, check time again in 15 minutes

// 2. Check database. If file has already been backed up, return to start. Don't back it up again. If not yet back up, continue.

// 3. This app will back up an Access database. So, check for presence of .ldb (locking) file.
	
	// STEP 1: Check if file is locked
	return file.isLockFilePresent(lockFile)
		.then((result) => {
			switch(result) {
				case false:
					// Not locked, continue

					// STEP 2: Back up file to local backup path
					// Get last modified date/time
					const backupSource = sourcePath + sourceFile;

					return file.lastModified(backupSource)
						.then((result) => {
							return result;
						}).then((result) => {							
							// Set backup file name
							const backupFileName = sourceFile.substring(0, sourceFile.indexOf('.')) +
																		'_' +
																		result +
																		sourceFile.substring(sourceFile.indexOf('.'));
							
							// Make a sub-folder named yyyy-mm
							const localTargetPathFull = localTargetPath + result.substring(0, 7);
							
							console.log('1. Going to call makeSubFolder from index');
							return file.makeSubFolder(localTargetPathFull)
								.then((result) => {
									console.log('6. Created subfolder, result: ', result);
									// TODO: Start here
								})

							const backupDestination = localTargetPath + backupFileName
							// Now, actually copy the file
/*							return file.copyFileToLocalBackup(backupSource, backupDestination)
								.then((result) => {
									return result;
								})*/



						})
					break;
				case true:
					// TO DO: Try again in one minute. Put some fences around this... if we're constantly checking and now it's past the 11:00 p.m. end time specified above, return to start and don't check again until 8:00 p.m.
					console.log('Lock file is present, try again later.');					
					break;
				default:
					console.log('Unexpected; try again later.');
			}
		})







// 6. Upload the backup to a destination. Log this.

// 7. End
}

app();






