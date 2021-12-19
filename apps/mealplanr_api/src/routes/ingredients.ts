import { Router } from 'express';
import { getSwaggerObject } from '.';
import {
	createIngredientHandler,
	deleteIngredientHandler,
	getIngredientHandler,
	updateIngredientHandler,
} from '../collections/ingredient/ingredient.controller';
import { ingredientSM } from '../collections/ingredient/ingredient.model';
import {
	createIngredientSchema,
	deleteIngredientSchema,
	getIngredientSchema,
	updateIngredientSchema,
} from '../collections/ingredient/ingredient.schema';
import { requiresUser, validateRequest } from '../middleware';

const router = Router();

// Create a new ingredient
router.post(
	'/',
	[requiresUser, validateRequest(createIngredientSchema)],
	createIngredientHandler
);
export const ingredientsPost = {
	...getSwaggerObject({
		CRUD: 'post',
		item: 'ingredient',
		tag: 'ingredients',
		summary: 'Create new ingredient',
		description:
			'Creates a new ingredient to be used in settings and for mealplans and shoppinglist',
		requiresUser: true,
		queryId: { required: false },
		body: {
			required: true,
			model: ingredientSM,
		},
		respondObject: {
			required: true,
			model: ingredientSM,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'403': {
				description: 'User not logged in',
			},
			'409': {
				description: 'Ingredient already exists',
			},
		},
	}),
};

// Update a ingredient
router.put(
	'/',
	[requiresUser, validateRequest(updateIngredientSchema)],
	updateIngredientHandler
);
export const ingredientsPut = {
	...getSwaggerObject({
		CRUD: 'put',
		item: 'ingredient',
		tag: 'ingredients',
		summary: 'Update ingredient',
		description: 'Updates a ingredient that is globally available',
		requiresUser: true,
		queryId: { required: true, id: 'ingredientId' },
		body: {
			required: true,
			model: ingredientSM,
		},
		respondObject: {
			required: true,
			model: ingredientSM,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'No such ingredient exists',
			},
			'409': {
				description: 'Ingredient already exists',
			},
		},
	}),
};

// Get a ingredient
router.get('/', [validateRequest(getIngredientSchema)], getIngredientHandler);
export const ingredientsGet = {
	...getSwaggerObject({
		CRUD: 'get',
		item: 'ingredient',
		tag: 'ingredients',
		summary: 'Get a ingredient',
		description: 'Get a ingredient based on the ingredientId',
		requiresUser: false,
		queryId: { required: true, id: 'ingredientId' },
		body: {
			required: false,
		},
		respondObject: {
			required: true,
			model: ingredientSM,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'404': {
				description: 'No such ingredient exists',
			},
		},
	}),
};

// Delete a ingredient
router.delete(
	'/',
	[requiresUser, validateRequest(deleteIngredientSchema)],
	deleteIngredientHandler
);
export const ingredientsDelete = {
	...getSwaggerObject({
		CRUD: 'delete',
		item: 'ingredient',
		tag: 'ingredients',
		summary: 'Delete a ingredient',
		description: 'Delete a ingredient based on the ingredientId',
		requiresUser: true,
		queryId: { required: true, id: 'ingredientId' },
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
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'No such ingredient exists',
			},
		},
	}),
};

export default router;
