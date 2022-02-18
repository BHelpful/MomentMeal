import {
	DocumentDefinition,
	FilterQuery,
	UpdateQuery,
	QueryOptions,
} from 'mongoose';
import categoryModel, { CategoryCreationParams, CategoryDocument } from './category.model';
import sanitize = require('mongo-sanitize');



export class CategoriesService {
	public create(body: CategoryCreationParams): Promise<CategoryDocument> {
		return this.createCategory(body);
	}

	public get(_id: string): Promise<CategoryDocument | null> {
		return this.findCategory({ _id });
	}

	public update(
		query: FilterQuery<CategoryDocument>,
		update: UpdateQuery<CategoryDocument>
	) {
		return this.findAndUpdateCategory(query, update, {
			new: true,
			// This is false because setting it true deprecated https://mongoosejs.com/docs/deprecations.html#findandmodify
			useFindAndModify: false,
		});
	}

	public delete(_id: string): Promise<CategoryDocument | null> {
		return this.deleteCategory({ _id });
	}

	/**
	 * This function will create a new category for a user and return the category
	 *
	 * @param body - The body of the category (based on the categoryModel)
	 * @returns a category document
	 */
	private async createCategory(body: DocumentDefinition<CategoryDocument>) {
		try {
			body = sanitize(body);
			return await categoryModel.create(body);
		} catch (error) {
			throw new Error(error as string);
		}
	}

	/**
	 * This function will find a category and return it
	 *
	 * @param query - a query object that will be used to find a category from the DB
	 * @param options - options for the findOne function from mongoose
	 * @returns a category document
	 */
	private async findCategory(
		query: FilterQuery<CategoryDocument>,
		options: QueryOptions = { lean: true }
	) {
		try {
			query = sanitize(query);
			return categoryModel.findOne(query, {}, options);
		} catch (error) {
			throw new Error(error as string);
		}
	}

	/**
	 * This function will find, update and return a category
	 *
	 * @param query - a query object that will be used to find a category from the DB
	 * @param update - a query object that will be used to specify the update
	 * @param options - options for the findOne function from mongoose
	 * @returns a category document
	 */
	private async findAndUpdateCategory(
		query: FilterQuery<CategoryDocument>,
		update: UpdateQuery<CategoryDocument>,
		options: QueryOptions
	) {
		try {
			query = sanitize(query);
			update = sanitize(update);
			return categoryModel.findOneAndUpdate(query, update, options);
		} catch (error) {
			throw new Error(error as string);
		}
	}

	/**
	 * This function will find and delete a category
	 *
	 * @param query - a query object that will be used to find a category from the DB
	 * @returns a category document
	 */
	private async deleteCategory(query: FilterQuery<CategoryDocument>) {
		try {
			query = sanitize(query);
			return categoryModel.deleteOne(query);
		} catch (error) {
			throw new Error(error as string);
		}
	}
}









/**
 * This function will create a new category for a user and return the category
 *
 * @param body - The body of the category (based on the categoryModel)
 * @returns a category document
 */
export async function createCategory(
	body: DocumentDefinition<CategoryDocument>
) {
	try {
		body = sanitize(body);

		return await categoryModel.create(body);
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * This function will find a category and return it
 *
 * @param query - a query object that will be used to find a category from the DB
 * @param options - options for the findOne function from mongoose
 * @returns a category document
 */
export async function findCategory(
	query: FilterQuery<CategoryDocument>,
	options: QueryOptions = { lean: true }
) {
	try {
		query = sanitize(query);

		return categoryModel.findOne(query, {}, options);
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * This function will find, update and return a category
 *
 * @param query - a query object that will be used to find a category from the DB
 * @param update - a query object that will be used to specify the update
 * @param options - options for the findOne function from mongoose
 * @returns a category document
 */
export async function findAndUpdateCategory(
	query: FilterQuery<CategoryDocument>,
	update: UpdateQuery<CategoryDocument>,
	options: QueryOptions
) {
	try {
		query = sanitize(query);
		update = sanitize(update);
		return categoryModel.findOneAndUpdate(query, update, options);
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * This function will find and delete a category
 *
 * @param query - a query object that will be used to find a category from the DB
 * @returns a category document
 */
export async function deleteCategory(query: FilterQuery<CategoryDocument>) {
	try {
		query = sanitize(query);
		return categoryModel.deleteOne(query);
	} catch (error) {
		throw new Error(error as string);
	}
}
