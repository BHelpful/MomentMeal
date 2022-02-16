import { Router } from 'express';
import {
	createFileHandler,
	deleteFileHandler,
	getFileHandler,
} from '../collections/file/file.controller';
import {
	createFileSchema,
	deleteFileSchema,
	getFileSchema,
} from '../collections/file/file.schema';
import { requiresUser, validateRequest, uploadFiles } from '../middleware';

const files = Router();

// Create a new file
files.post(
	'/upload',
	[requiresUser, validateRequest(createFileSchema), uploadFiles],
	createFileHandler
);

// Get a file
files.get('/:filename', [validateRequest(getFileSchema)], getFileHandler);

// Delete a file
files.delete(
	'/:filename',
	[requiresUser, validateRequest(deleteFileSchema)],
	deleteFileHandler
);

export default files;
