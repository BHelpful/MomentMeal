import { Router } from 'express';
import { getSwaggerObject } from '.';
import {
	createCategoryHandler,
	deleteCategoryHandler,
	getCategoryHandler,
	updateCategoryHandler,
} from '../collections/category/category.controller';
import { categorySM } from '../collections/category/category.model';
import {
	createCategorySchema,
	deleteCategorySchema,
	getCategorySchema,
	updateCategorySchema,
} from '../collections/category/category.schema';
import { requiresUser, validateRequest } from '../middleware';

const router = Router();

// Create a new category
router.post(
	'/',
	[requiresUser, validateRequest(createCategorySchema)],
	createCategoryHandler
);
export const categoriesPost = {
	...getSwaggerObject({
		CRUD: 'post',
		item: 'category',
		tag: 'categories',
		summary: 'Create new category',
		description:
			'Creates a new category to be used in settings and for mealplans and shoppinglist',
		requiresUser: true,
		queryId: { required: false },
		body: {
			required: true,
			model: categorySM,
		},
		respondObject: {
			required: true,
			model: categorySM,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'403': {
				description: 'User not logged in',
			},
			'409': {
				description: 'Category already exists',
			},
		},
	}),
};

// Update a category
router.put(
	'/',
	[requiresUser, validateRequest(updateCategorySchema)],
	updateCategoryHandler
);
export const categoriesPut = {
	...getSwaggerObject({
		CRUD: 'put',
		item: 'category',
		tag: 'categories',
		summary: 'Update category',
		description: 'Updates a category that is globally available',
		requiresUser: true,
		queryId: { required: true, id: 'categoryId' },
		body: {
			required: true,
			model: categorySM,
		},
		respondObject: {
			required: true,
			model: categorySM,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'No such category exists',
			},
			'409': {
				description: 'Category already exists',
			},
		},
	}),
};

// Get a category
router.get('/', [validateRequest(getCategorySchema)], getCategoryHandler);
export const categoriesGet = {
	...getSwaggerObject({
		CRUD: 'get',
		item: 'category',
		tag: 'categories',
		summary: 'Get a category',
		description: 'Get a category based on the categoryId',
		requiresUser: false,
		queryId: { required: true, id: 'categoryId' },
		body: {
			required: false,
		},
		respondObject: {
			required: true,
			model: categorySM,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'404': {
				description: 'No such category exists',
			},
		},
	}),
};

// Delete a category
router.delete(
	'/',
	[requiresUser, validateRequest(deleteCategorySchema)],
	deleteCategoryHandler
);
export const categoriesDelete = {
	...getSwaggerObject({
		CRUD: 'delete',
		item: 'category',
		tag: 'categories',
		summary: 'Delete a category',
		description: 'Delete a category based on the categoryId',
		requiresUser: true,
		queryId: { required: true, id: 'categoryId' },
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
				description: 'No such category exists',
			},
		},
	}),
};

export default router;
