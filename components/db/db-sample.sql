/* Written for PostgreSQL. Remember to change the password! */

CREATE DATABASE backup_log;

USE backup_log;
CREATE USER backup_user WITH password 'password';
GRANT ALL PRIVILEGES ON DATABASE backup_log to backup_user;

DROP TABLE IF EXISTS backup_status;

CREATE TABLE IF NOT EXISTS backup_status (
	backup_status_id SERIAL PRIMARY KEY,
	status_name VARCHAR(25) NOT NULL,
	status_descr VARCHAR(50)
);

INSERT INTO backup_status ( status_name, status_descr ) VALUES( 'local success', 'Successfully backed up to local destination');
INSERT INTO backup_status ( status_name, status_descr ) VALUES( 'sharepoint success', 'Successfully backed up to SharePoint');

DROP TABLE IF EXISTS backup_log;

CREATE TABLE IF NOT EXISTS backup_log (
	backup_log_id SERIAL PRIMARY KEY,
	backup_datetime TIMESTAMP NOT NULL DEFAULT NOW(),
	destination_file_name VARCHAR(255),
	backup_status_id INT NOT NULL,
	FOREIGN KEY (backup_status_id) REFERENCES backup_status (backup_status_id)
);