import { Router } from 'express';
import { getSwaggerObject } from '.';
import {
	createFileHandler,
	deleteFileHandler,
	getFileHandler,
} from '../collections/file/file.controller';
import { fileSM } from '../collections/file/file.model';
import {
	createFileSchema,
	deleteFileSchema,
	getFileSchema,
} from '../collections/file/file.schema';
import { requiresUser, validateRequest, uploadFiles } from '../middleware';

const router = Router();

// Create a new file
router.post(
	'/upload',
	[requiresUser, validateRequest(createFileSchema), uploadFiles],
	createFileHandler
);
export const filesPost = {
	...getSwaggerObject({
		CRUD: 'post',
		item: 'file',
		tag: 'files',
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

// Get a file
router.get('/', [validateRequest(getFileSchema)], getFileHandler);
export const filesGet = {
	...getSwaggerObject({
		CRUD: 'get',
		item: 'file',
		tag: 'files',
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
export const filesDelete = {
	...getSwaggerObject({
		CRUD: 'delete',
		item: 'file',
		tag: 'files',
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
