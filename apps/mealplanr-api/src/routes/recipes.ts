import { Router } from 'express';
import {
	createRecipeHandler,
	deleteRecipeHandler,
	getRecipeHandler,
	updateRecipeHandler,
} from '../collections/recipe/recipe.controller';
import {
	createRecipeSchema,
	deleteRecipeSchema,
	getRecipeSchema,
	updateRecipeSchema,
} from '../collections/recipe/recipe.schema';
import { requiresUser, validateRequest } from '../middleware';

const recipes = Router();

// Create a new recipe
recipes.post(
	'/',
	[requiresUser, validateRequest(createRecipeSchema)],
	createRecipeHandler
);

// Update a recipe
recipes.put(
	'/',
	[requiresUser, validateRequest(updateRecipeSchema)],
	updateRecipeHandler
);

// Get a recipe
recipes.get('/', [validateRequest(getRecipeSchema)], getRecipeHandler);

// Delete a recipe
recipes.delete(
	'/',
	[requiresUser, validateRequest(deleteRecipeSchema)],
	deleteRecipeHandler
);

export default recipes;
