import { Request, Response } from 'express';
import { connection, mongo } from 'mongoose';
import Grid = require('gridfs-stream');
import Logger from '../../config/Logger';

const db = connection;
let gfs: Grid.Grid;

db.once('open', function () {
	gfs = Grid(db.db, mongo);
	gfs.collection('photos');
});

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
		return res.status(400).send('You must select a file to send.');
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
	try {
		Logger.info(req.params.filename);
		const file = await gfs.files.findOne({ filename: req.params.filename });
		if (!file) throw new Error('File not found');
		const readStream = gfs.createReadStream(file.filename);
		return readStream.pipe(res);
	} catch (error) {
		Logger.error(error);
		return res.status(404).send('No such file exists');
	}
}

/**
 * This function is used to request the deletion of a file.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with status 200 if successful
 */
export async function deleteFileHandler(req: Request, res: Response) {
	try {
		const file = await gfs.files.findOne({ filename: req.params.filename });
		if (!file) return res.status(404).send('No such file exists');
		await gfs.files.deleteOne({ filename: req.params.filename });
		return res.send('success');
	} catch (error) {
		console.log(error);
		return res.status(400).send('An error occurred.');
	}
}
