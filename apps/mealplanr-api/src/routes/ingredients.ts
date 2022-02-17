import { Router } from 'express';
import {
	createIngredientHandler,
	deleteIngredientHandler,
	getIngredientHandler,
	updateIngredientHandler,
} from '../collections/ingredient/ingredient.controller';
import {
	createIngredientSchema,
	deleteIngredientSchema,
	getIngredientSchema,
	updateIngredientSchema,
} from '../collections/ingredient/ingredient.schema';
import { requiresUser, validateRequest } from '../middleware';

const ingredients = Router();

// Create a new ingredient
ingredients.post(
	'/',
	[requiresUser, validateRequest(createIngredientSchema)],
	createIngredientHandler
);

// Update a ingredient
ingredients.put(
	'/',
	[requiresUser, validateRequest(updateIngredientSchema)],
	updateIngredientHandler
);

// Get a ingredient
ingredients.get('/', [validateRequest(getIngredientSchema)], getIngredientHandler);

// Delete a ingredient
ingredients.delete(
	'/',
	[requiresUser, validateRequest(deleteIngredientSchema)],
	deleteIngredientHandler
);

export default ingredients;
