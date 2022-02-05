import { Router } from 'express';
import { getSwaggerObject } from '.';
import {
	createFileHandler,
	deleteFileHandler,
	getFileHandler,
	updateFileHandler,
} from '../collections/file/file.controller';
import { fileSM } from '../collections/file/file.model';
import {
	createFileSchema,
	deleteFileSchema,
	getFileSchema,
	updateFileSchema,
} from '../collections/file/file.schema';
import { requiresUser, validateRequest } from '../middleware';

const router = Router();

// Create a new file
router.post(
	'/',
	[requiresUser, validateRequest(createFileSchema)],
	createFileHandler
);
export const categoriesPost = {
	...getSwaggerObject({
		CRUD: 'post',
		item: 'file',
		tag: 'categories',
		summary: 'Create new file',
		description:
			'Creates a new file to be used in settings and for mealplans and shoppinglist',
		requiresUser: true,
		queryId: { required: false },
		body: {
			required: true,
			model: fileSM,
		},
		respondObject: {
			required: true,
			model: fileSM,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'403': {
				description: 'User not logged in',
			},
			'409': {
				description: 'File already exists',
			},
		},
	}),
};

// Update a file
router.put(
	'/',
	[requiresUser, validateRequest(updateFileSchema)],
	updateFileHandler
);
export const categoriesPut = {
	...getSwaggerObject({
		CRUD: 'put',
		item: 'file',
		tag: 'categories',
		summary: 'Update file',
		description: 'Updates a file that is globally available',
		requiresUser: true,
		queryId: { required: true, id: 'fileId' },
		body: {
			required: true,
			model: fileSM,
		},
		respondObject: {
			required: true,
			model: fileSM,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'403': {
				description: 'User not logged in',
			},
			'404': {
				description: 'No such file exists',
			},
			'409': {
				description: 'File already exists',
			},
		},
	}),
};

// Get a file
router.get('/', [validateRequest(getFileSchema)], getFileHandler);
export const categoriesGet = {
	...getSwaggerObject({
		CRUD: 'get',
		item: 'file',
		tag: 'categories',
		summary: 'Get a file',
		description: 'Get a file based on the fileId',
		requiresUser: false,
		queryId: { required: true, id: 'fileId' },
		body: {
			required: false,
		},
		respondObject: {
			required: true,
			model: fileSM,
		},
		invalidResponses: {
			'400': {
				description: 'Bad Request',
			},
			'404': {
				description: 'No such file exists',
			},
		},
	}),
};

// Delete a file
router.delete(
	'/',
	[requiresUser, validateRequest(deleteFileSchema)],
	deleteFileHandler
);
export const categoriesDelete = {
	...getSwaggerObject({
		CRUD: 'delete',
		item: 'file',
		tag: 'categories',
		summary: 'Delete a file',
		description: 'Delete a file based on the fileId',
		requiresUser: true,
		queryId: { required: true, id: 'fileId' },
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
				description: 'No such file exists',
			},
		},
	}),
};

export default router;
