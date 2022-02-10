import { Request, Response } from 'express';
import { get } from 'lodash';
import { findFile, deleteFile } from './file.service';

/**
 * This function is used to request the creation of a new file.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the file.
 */
export async function createFileHandler(req: Request, res: Response) {
	// gets items from default config file
	const port: number = parseInt(process.env.PORT as string, 10) || 3000;
	const host: string = (process.env.HOST as string) || 'localhost';

	if (req.file === undefined)
		return res.status(400).send('you must select a file.');
	const imgUrl = `http://${host}:${port}/files/${req.file.filename}`;
	return res.send(imgUrl);
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
