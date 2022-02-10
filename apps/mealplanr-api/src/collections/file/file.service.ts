import {
	DocumentDefinition,
	FilterQuery,
	QueryOptions,
} from 'mongoose';
import fileModel, { FileDocument } from './file.model';
import sanitize = require('mongo-sanitize');

/**
 * This function will create a new file for a user and return the file
 *
 * @param body - The body of the file (based on the fileModel)
 * @returns a file document
 */
export async function createFile(body: DocumentDefinition<FileDocument>) {
	try {
		body = sanitize(body);

		return await fileModel.create(body);
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * This function will find a file and return it
 *
 * @param query - a query object that will be used to find a file from the DB
 * @param options - options for the findOne function from mongoose
 * @returns a file document
 */
export async function findFile(
	query: FilterQuery<FileDocument>,
	options: QueryOptions = { lean: true }
) {
	try {
		query = sanitize(query);

		return fileModel.findOne(query, {}, options);
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * This function will find and delete a file
 *
 * @param query - a query object that will be used to find a file from the DB
 * @returns a file document
 */
export async function deleteFile(query: FilterQuery<FileDocument>) {
	try {
		query = sanitize(query);
		return fileModel.deleteOne(query);
	} catch (error) {
		throw new Error(error as string);
	}
}
