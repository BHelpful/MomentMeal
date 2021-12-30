import {
	DocumentDefinition,
	FilterQuery,
	Query,
	QueryOptions,
	UpdateQuery,
} from 'mongoose';
import userModel, { UserDocument } from './user.model';
import sanitize = require('mongo-sanitize');

function populateUser(model: Query<any, any> | UserDocument) {
	return model
		.populate({
			path: 'collectionId',
			populate: {
				path: 'ingredients.ingredientId',
				populate: { path: 'typeId' },
			},
		})
		.populate('options.storesId')
		.populate('plan.recipesId')
		.populate('availableIngredientsId')
		.populate({
			path: 'availableIngredientsId',
			populate: { path: 'typeId' },
		})
		.populate({
			path: 'shoppingList.ingredients.ingredientId',
			populate: { path: 'typeId' },
		})
		.populate('shoppingList.ingredients.storeId')
		.populate('planId')
		.populate({
			path: 'plan.recipesId',
			populate: {
				path: 'ingredients.ingredientId',
				populate: { path: 'typeId' },
			},
		});
}

/**
 * This function is used to create a new user.
 *
 * @remarks
 * Uses the .create() method on the User object (which is the mongoose schema of the users collection)
 * In the same way as with the validation schema, any keys from the body of the requests
 * that matches the keys from the mongoose schema will be added to the database.
 * If there are required keys e.g. email, these need to be in the object in order to be accepted
 * however this will already be checked for in the validation schema.
 *
 * @param input - The user object to be created.
 * @returns - The created user object.
 */
export async function createUser(input: DocumentDefinition<UserDocument>) {
	try {
		input = sanitize(input);

		return populateUser(await userModel.create(input));
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * This function uses mongoose to find a user from the DB based on a querry.
 *
 * @param query - a query object that will be used to find a user from the DB
 * @returns a promise that resolves to the user that was found
 */
export async function findUser(query: FilterQuery<UserDocument>) {
	try {
		query = sanitize(query);

		return populateUser(userModel.findOne(query));
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * This function will find, update and return a user
 *
 * @param query - a query object that will be used to find a user from the DB
 * @param update - a query object that will be used to specify the update
 * @param options - options for the findOne function from mongoose
 * @returns a user document
 */
export async function findAndUpdateUser(
	query: FilterQuery<UserDocument>,
	update: UpdateQuery<UserDocument>,
	options: QueryOptions
) {
	try {
		query = sanitize(query);
		update = sanitize(update);
		return populateUser(userModel.findOneAndUpdate(query, update, options));
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * This function will find and delete a user
 *
 * @param query - a query object that will be used to find a user from the DB
 * @returns a user document
 */
export async function deleteUser(query: FilterQuery<UserDocument>) {
	try {
		query = sanitize(query);
		return userModel.deleteOne(query);
	} catch (error) {
		throw new Error(error as string);
	}
}
