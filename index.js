const cron = require('node-cron');
const log = require ('./components/log/log');

// log.logEntry('info', 'Service started');

// https://stackoverflow.com/questions/10547974/how-to-install-node-js-as-windows-service

// 1. Define time period in which to run job (e.g., between 8:00 p.m. and 11:00 p.m.). If current time is in that period, continue. Else, check time again in 15 minutes

// 2. Check log. If file has already been backed up, return to start. Don't back it up again. If not yet back up, continue.

// 3. This app will back up an Access database. So, check for presence of .ldb (locking) file.
// If locked, check again in one minute. Put some fences around this... if we're constantly checking and now it's past the 11:00 p.m. end time specified above, return to start and don't check again until 8:00 p.m.

// Every minute for testing only; move timing to config eventually
/*const cronJob = cron.schedule('* * * * *', function() {
	console.log('Running task every minute');
})*/

// 4. Get date and time stamp from file. We'll name the back up using this, since Access likes to change the date/time modified every time you open Access, even if no changes have been made.
//		So, if database is named my-access-db.accdb and it was last modified 8/2/19 at 5:03 p.m., we will name the backup my-access-db_2019-08-02_1703.accdb.

// 5. Make a copy of the file in a the local backup folder. Log this.

// 6. Upload the backup to a destination. Log this.

// 7. End







