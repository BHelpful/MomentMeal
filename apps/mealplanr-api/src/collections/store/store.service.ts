import {
	DocumentDefinition,
	FilterQuery,
	UpdateQuery,
	QueryOptions,
} from 'mongoose';
import storeModel, {
	Store,
	StoreCreationParams,
	StoreDocument,
} from './store.model';
import sanitize = require('mongo-sanitize');
import log from '../../logger';

export class StoresService {
	/**
	 * This function will create a new store for a user and return the store
	 *
	 * @param body - The body of the store (based on the storeModel)
	 * @returns a store document
	 */
	public create(body: StoreCreationParams): Promise<StoreDocument> {
		body = sanitize(body);
		return storeModel.create(body);
	}

	public get(_id: string): Promise<StoreDocument | null> {
		return this.findStore({ _id });
	}

	/**
	 * This function will find a store and return it
	 *
	 * @param query - a query object that will be used to find a store from the DB
	 * @param options - options for the findOne function from mongoose
	 * @returns a store document
	 */
	private async findStore(
		query: FilterQuery<StoreDocument>,
		options: QueryOptions = { lean: true }
	) {
		try {
			query = sanitize(query);
			return storeModel.findOne(query, {}, options);
		} catch (error) {
			throw new Error(error as string);
		}
	}
}

/**
 * This function will find, update and return a store
 *
 * @param query - a query object that will be used to find a store from the DB
 * @param update - a query object that will be used to specify the update
 * @param options - options for the findOne function from mongoose
 * @returns a store document
 */
export async function findAndUpdateStore(
	query: FilterQuery<StoreDocument>,
	update: UpdateQuery<StoreDocument>,
	options: QueryOptions
) {
	try {
		query = sanitize(query);
		update = sanitize(update);
		return storeModel.findOneAndUpdate(query, update, options);
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * This function will find and delete a store
 *
 * @param query - a query object that will be used to find a store from the DB
 * @returns a store document
 */
export async function deleteStore(query: FilterQuery<StoreDocument>) {
	try {
		query = sanitize(query);
		return storeModel.deleteOne(query);
	} catch (error) {
		throw new Error(error as string);
	}
}
