import { Router } from 'express';
import {
	createStoreHandler,
	deleteStoreHandler,
	getStoreHandler,
	updateStoreHandler,
} from '../collections/store/store.controller';
import {
	createStoreSchema,
	deleteStoreSchema,
	getStoreSchema,
	updateStoreSchema,
} from '../collections/store/store.schema';
import { requiresUser, validateRequest } from '../middleware';

const stores = Router();

// Create a new store
stores.post(
	'/',
	[requiresUser, validateRequest(createStoreSchema)],
	createStoreHandler
);

// Update a store
stores.put(
	'/',
	[requiresUser, validateRequest(updateStoreSchema)],
	updateStoreHandler
);

// Get a store
stores.get('/', [validateRequest(getStoreSchema)], getStoreHandler);

// Delete a store
stores.delete(
	'/',
	[requiresUser, validateRequest(deleteStoreSchema)],
	deleteStoreHandler
);

export default stores;
