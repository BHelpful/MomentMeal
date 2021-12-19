import { Router } from 'express';
import { getSwaggerObject } from '.';
import {
	createStoreHandler,
	deleteStoreHandler,
	getStoreHandler,
	updateStoreHandler,
} from '../collections/store/store.controller';
import { storeSM } from '../collections/store/store.model';
import {
	createStoreSchema,
	deleteStoreSchema,
	getStoreSchema,
	updateStoreSchema,
} from '../collections/store/store.schema';
import { requiresUser, validateRequest } from '../middleware';

const router = Router();

// Create a new store
router.post(
	'/',
	[requiresUser, validateRequest(createStoreSchema)],
	createStoreHandler
);
export const storesPost = {
	...getSwaggerObject({
		CRUD: 'post',
		item: 'store',
		tag: 'stores',
		summary: 'Create new store',
		description:
			'Creates a new store to be used in settings and for mealplans and shoppinglist',
		requiresUser: true,
		queryId: { required: false },
		body: {
			required: true,
			model: storeSM,
		},
		respondObject: {
			required: true,
			model: storeSM,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'403': {
				description: 'User not logged in',
			},
			'409': {
				description: 'Store already exists',
			},
		},
	}),
};

// Update a store
router.put(
	'/',
	[requiresUser, validateRequest(updateStoreSchema)],
	updateStoreHandler
);
export const storesPut = {
	...getSwaggerObject({
		CRUD: 'put',
		item: 'store',
		tag: 'stores',
		summary: 'Update store',
		description: 'Updates a store that is globally available',
		requiresUser: true,
		queryId: { required: true, id: 'storeId' },
		body: {
			required: true,
			model: storeSM,
		},
		respondObject: {
			required: true,
			model: storeSM,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'No such store exists',
			},
			'409': {
				description: 'Store already exists',
			},
		},
	}),
};

// Get a store
router.get('/', [validateRequest(getStoreSchema)], getStoreHandler);
export const storesGet = {
	...getSwaggerObject({
		CRUD: 'get',
		item: 'store',
		tag: 'stores',
		summary: 'Get a store',
		description: 'Get a store based on the storeId',
		requiresUser: false,
		queryId: { required: true, id: 'storeId' },
		body: {
			required: false,
		},
		respondObject: {
			required: true,
			model: storeSM,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'404': {
				description: 'No such store exists',
			},
		},
	}),
};

// Delete a store
router.delete(
	'/',
	[requiresUser, validateRequest(deleteStoreSchema)],
	deleteStoreHandler
);
export const storesDelete = {
	...getSwaggerObject({
		CRUD: 'delete',
		item: 'store',
		tag: 'stores',
		summary: 'Delete a store',
		description: 'Delete a store based on the storeId',
		requiresUser: true,
		queryId: { required: true, id: 'storeId' },
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
				description: 'No such store exists',
			},
		},
	}),
};

export default router;
