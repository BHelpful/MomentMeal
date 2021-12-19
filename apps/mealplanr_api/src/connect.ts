import { connect, disconnect } from 'mongoose';
import log from './logger';
import { MongoMemoryServer } from 'mongodb-memory-server';
const dbUri = process.env.DB_URI as string;
let mongod: MongoMemoryServer;

/**
 * This function connects to the mongoDB database on the server
 * using the dbURI from the config file.
 *
 * @remarks
 * It logs on success and on connection error.
 */
export async function connectDB() {
	if ((process.env.NODE_ENV as string) === 'test') {
		// In test environment, we don't want to connect to the real DB.
		mongod = await MongoMemoryServer.create();
		const uri = mongod.getUri();
		await connect(uri, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		})
			.then(() => {
				log.info('Mock connection success');
			})
			.catch((error) => {
				log.error('Error in mock connecting', error);
			});
	} else {
		// If not in test environment, connect to the database
		await connect(dbUri, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		})
			.then(() => {
				log.info('Connection success');
			})
			.catch((error) => {
				log.error('Error in connecting', error);
			});
	}
}

export async function closeDB() {
	mongod.stop();
	await disconnect();
}
