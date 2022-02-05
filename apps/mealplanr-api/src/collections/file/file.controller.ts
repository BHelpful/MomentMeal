import { Request, Response } from 'express';
import { get } from 'lodash';
import log from '../../logger';
import {
	createFile,
	findFile,
	findAndUpdateFile,
	deleteFile,
} from './file.service';

/**
 * This function is used to request the creation of a new file.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the file.
 */
export async function createFileHandler(req: Request, res: Response) {
	const body = req.body;

	try {
		if ((await findFile({ name: body.name }))?.name === body.name) {
			return res.status(409).send('File already exists');
		}
		const file = await createFile({ ...body });
		return res.send(file);
	} catch (e) {
		log.error(e as string);
	}
}

/**
 * This function is used to request the update of a file.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the updated file.
 */
export async function updateFileHandler(req: Request, res: Response) {
	const fileId = get(req, 'query.fileId');
	const update = req.body;

	const file = await findFile({ _id: fileId });

	if (!file) {
		return res.status(404).send('No such file exists');
	}

	if ((await findFile({ name: update.name }))?.name === update.name) {
		return res.status(409).send('File already exists');
	}

	const updatedFile = await findAndUpdateFile(
		{ _id: fileId },
		update,
		{
			new: true,
			// This is false because setting it true deprecated https://mongoosejs.com/docs/deprecations.html#findandmodify
			useFindAndModify: false,
		}
	);

	return res.send(updatedFile);
}

/**
 * This function is used to request a file.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the file.
 */
export async function getFileHandler(req: Request, res: Response) {
	const fileId = get(req, 'query.fileId');
	const file = await findFile({ _id: fileId });

	if (!file) {
		return res.status(404).send('No such file exists');
	}

	return res.send(file);
}

/**
 * This function is used to request the deletion of a file.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with status 200 if successful
 */
export async function deleteFileHandler(req: Request, res: Response) {
	const fileId = get(req, 'query.fileId');

	const file = await findFile({ _id: fileId });

	if (!file) {
		return res.status(404).send('No such file exists');
	}

	await deleteFile({ _id: fileId });

	return res.sendStatus(200);
}
