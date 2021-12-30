import {
	DocumentDefinition,
	FilterQuery,
	UpdateQuery,
	QueryOptions,
	Query,
} from 'mongoose';
import ingredientModel, { IngredientDocument } from './ingredient.model';
import sanitize = require('mongo-sanitize');

function populateIngredient(model: Query<any, any> | IngredientDocument) {
	return model.populate('typeId');
}

/**
 * This function will create a new ingredient for a user and return the ingredient
 *
 * @param body - The body of the ingredient (based on the ingredientModel)
 * @returns a ingredient document
 */
export async function createIngredient(
	body: DocumentDefinition<IngredientDocument>
) {
	try {
		body = sanitize(body);

		return populateIngredient(await ingredientModel.create(body));
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * This function will find a ingredient and return it
 *
 * @param query - a query object that will be used to find a ingredient from the DB
 * @param options - options for the findOne function from mongoose
 * @returns a ingredient document
 */
export async function findIngredient(
	query: FilterQuery<IngredientDocument>,
	options: QueryOptions = { lean: true }
) {
	try {
		query = sanitize(query);

		return populateIngredient(ingredientModel.findOne(query, {}, options));
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * This function will find, update and return a ingredient
 *
 * @param query - a query object that will be used to find a ingredient from the DB
 * @param update - a query object that will be used to specify the update
 * @param options - options for the findOne function from mongoose
 * @returns a ingredient document
 */
export async function findAndUpdateIngredient(
	query: FilterQuery<IngredientDocument>,
	update: UpdateQuery<IngredientDocument>,
	options: QueryOptions
) {
	try {
		query = sanitize(query);
		update = sanitize(update);
		return populateIngredient(
			ingredientModel.findOneAndUpdate(query, update, options)
		);
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * This function will find and delete a ingredient
 *
 * @param query - a query object that will be used to find a ingredient from the DB
 * @returns a ingredient document
 */
export async function deleteIngredient(query: FilterQuery<IngredientDocument>) {
	try {
		query = sanitize(query);
		return ingredientModel.deleteOne(query);
	} catch (error) {
		throw new Error(error as string);
	}
}
