import {
	DocumentDefinition,
	FilterQuery,
	UpdateQuery,
	QueryOptions,
} from 'mongoose';
import storeModel, {
	StoreCreationParams,
	StoreDocument,
} from '../models/store.model';
import sanitize = require('mongo-sanitize');
import { Service } from './Service';

export class StoresService extends Service<StoreDocument> {
	public constructor() {
		super(storeModel);
	}

	public create(body: StoreCreationParams): Promise<StoreDocument> {
		return this.createStore(body);
	}

	// public get(_id: string): Promise<StoreDocument | null> {
	// 	return this.findStore({ _id });
	// }
	public get(_id: string): Promise<StoreDocument> {
		return this.getById(_id);
	}

	// public update(
	// 	query: FilterQuery<StoreDocument>,
	// 	update: UpdateQuery<StoreDocument>
	// ) {
	// 	return this.findAndUpdateStore(query, update, {
	// 		new: true,
	// 		// This is false because setting it true deprecated https://mongoosejs.com/docs/deprecations.html#findandmodify
	// 		useFindAndModify: false,
	// 	});
	// }

	// public delete(_id: string): Promise<StoreDocument | null> {
	// 	return this.deleteStore({ _id });
	// }

	/**
	 * This function will create a new store for a user and return the store
	 *
	 * @param body - The body of the store (based on the storeModel)
	 * @returns a store document
	 */
	private async createStore(body: DocumentDefinition<StoreDocument>) {
		try {
			body = sanitize(body);
			return await storeModel.create(body);
		} catch (error) {
			throw new Error(error as string);
		}
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

	/**
	 * This function will find, update and return a store
	 *
	 * @param query - a query object that will be used to find a store from the DB
	 * @param update - a query object that will be used to specify the update
	 * @param options - options for the findOne function from mongoose
	 * @returns a store document
	 */
	private async findAndUpdateStore(
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
	private async deleteStore(query: FilterQuery<StoreDocument>) {
		try {
			query = sanitize(query);
			return storeModel.deleteOne(query);
		} catch (error) {
			throw new Error(error as string);
		}
	}
}
