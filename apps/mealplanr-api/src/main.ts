import log from './logger';
import { connection } from 'mongoose';
import app from './app';
import { connectDB } from './connect';

// gets items from default config file
const port: number = parseInt(process.env.PORT as string, 10) || 3000;
const host: string = (process.env.HOST as string) || 'localhost';

// this is used to get info on the connection to the DB.
const db = connection;

// connect to the mongoDB database
connectDB().then(() => {
	app.listen(port, host, () => {
		log.info(`Server is running at http://${host}:${port}/`);

		db.on('error', (err) => {
			log.error(err);
			// exit the process with a failure
			process.exit(1);
		});
	});
});
