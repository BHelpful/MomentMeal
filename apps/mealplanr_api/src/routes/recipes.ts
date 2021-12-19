import { Router } from 'express';
import { getSwaggerObject } from '.';
import {
	createRecipeHandler,
	deleteRecipeHandler,
	getRecipeHandler,
	updateRecipeHandler,
} from '../collections/recipe/recipe.controller';
import { recipeSM } from '../collections/recipe/recipe.model';
import {
	createRecipeSchema,
	deleteRecipeSchema,
	getRecipeSchema,
	updateRecipeSchema,
} from '../collections/recipe/recipe.schema';
import { requiresUser, validateRequest } from '../middleware';

const router = Router();

// Create a new recipe
router.post(
	'/',
	[requiresUser, validateRequest(createRecipeSchema)],
	createRecipeHandler
);
export const recipesPost = {
	...getSwaggerObject({
		CRUD: 'post',
		item: 'recipe',
		tag: 'recipes',
		summary: 'Create new recipe',
		description: "Creates a new recipe to add to the user's collection",
		requiresUser: true,
		queryId: { required: false },
		body: {
			required: true,
			model: recipeSM,
			omit: ['rating'],
		},
		respondObject: {
			required: true,
			model: recipeSM,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'403': {
				description: 'User not logged in',
			},
		},
	}),
};

// Update a recipe
router.put(
	'/',
	[requiresUser, validateRequest(updateRecipeSchema)],
	updateRecipeHandler
);
export const recipesPut = {
	...getSwaggerObject({
		CRUD: 'put',
		item: 'recipe',
		tag: 'recipes',
		summary: 'Update recipe',
		description: 'Updates a recipe that the user owns',
		requiresUser: true,
		queryId: { required: true, id: 'recipeId' },
		body: {
			required: true,
			model: recipeSM,
		},
		respondObject: {
			required: true,
			model: recipeSM,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'401': {
				description: 'User not the creator of the recipe',
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'No such recipe exists',
			},
		},
	}),
};

// Get a recipe
router.get('/', [validateRequest(getRecipeSchema)], getRecipeHandler);
export const recipesGet = {
	...getSwaggerObject({
		CRUD: 'get',
		item: 'recipe',
		tag: 'recipes',
		summary: 'Get a recipe',
		description: 'Get a recipe based on the recipeId',
		requiresUser: true,
		queryId: { required: true, id: 'recipeId' },
		body: {
			required: false,
		},
		respondObject: {
			required: true,
			model: recipeSM,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'404': {
				description: 'No such recipe exists',
			},
		},
	}),
};

// Delete a recipe
router.delete(
	'/',
	[requiresUser, validateRequest(deleteRecipeSchema)],
	deleteRecipeHandler
);
export const recipesDelete = {
	...getSwaggerObject({
		CRUD: 'delete',
		item: 'recipe',
		tag: 'recipes',
		summary: 'Delete a recipe',
		description: 'Delete a recipe based on the recipeId',
		requiresUser: true,
		queryId: { required: true, id: 'recipeId' },
		body: {
			required: false,
		},
		respondObject: {
			required: false,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'401': {
				description: 'User not the creator of the recipe',
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'No such recipe exists',
			},
		},
	}),
};

export default router;
