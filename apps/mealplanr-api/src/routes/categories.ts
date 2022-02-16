import { Router } from 'express';
import {
	createCategoryHandler,
	deleteCategoryHandler,
	getCategoryHandler,
	updateCategoryHandler,
} from '../collections/category/category.controller';
import {
	createCategorySchema,
	deleteCategorySchema,
	getCategorySchema,
	updateCategorySchema,
} from '../collections/category/category.schema';
import { requiresUser, validateRequest } from '../middleware';

const categories = Router();

// Create a new category
categories.post(
	'/',
	[requiresUser, validateRequest(createCategorySchema)],
	createCategoryHandler
);

// Update a category
categories.put(
	'/',
	[requiresUser, validateRequest(updateCategorySchema)],
	updateCategoryHandler
);

// Get a category
categories.get('/', [validateRequest(getCategorySchema)], getCategoryHandler);

// Delete a category
categories.delete(
	'/',
	[requiresUser, validateRequest(deleteCategorySchema)],
	deleteCategoryHandler
);

export default categories;
