import { Request, Response } from 'express';
import { get } from 'lodash';
import log from '../../logger';
import {
	createStore,
	findStore,
	findAndUpdateStore,
	deleteStore,
} from './store.service';

/**
 * This function is used to request the creation of a new store.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the store.
 */
export async function createStoreHandler(req: Request, res: Response) {
	const body = req.body;

	try {
		if ((await findStore({ name: body.name }))?.name === body.name) {
			return res.status(409).send('Store already exists');
		}
		const store = await createStore({ ...body });
		return res.send(store);
	} catch (e) {
		log.error(e as string);
	}
}

/**
 * This function is used to request the update of a store.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the updated store.
 */
export async function updateStoreHandler(req: Request, res: Response) {
	const storeId = get(req, 'query.storeId');
	const update = req.body;

	const store = await findStore({ _id: storeId });

	if (!store) {
		return res.status(404).send('No such store exists');
	}

	if ((await findStore({ name: update.name }))?.name === update.name) {
		return res.status(409).send('Store already exists');
	}

	const updatedStore = await findAndUpdateStore({ _id: storeId }, update, {
		new: true,
		// This is false because setting it true deprecated https://mongoosejs.com/docs/deprecations.html#findandmodify
		useFindAndModify: false,
	});

	return res.send(updatedStore);
}

/**
 * This function is used to request a store.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the store.
 */
export async function getStoreHandler(req: Request, res: Response) {
	const storeId = get(req, 'query.storeId');
	const store = await findStore({ _id: storeId });

	if (!store) {
		return res.status(404).send('No such store exists');
	}

	return res.send(store);
}

/**
 * This function is used to request the deletion of a store.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with status 200 if successful
 */
export async function deleteStoreHandler(req: Request, res: Response) {
	const storeId = get(req, 'query.storeId');

	const store = await findStore({ _id: storeId });

	if (!store) {
		return res.status(404).send('No such store exists');
	}

	await deleteStore({ _id: storeId });

	return res.sendStatus(200);
}
