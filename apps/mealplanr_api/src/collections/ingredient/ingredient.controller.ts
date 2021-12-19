import { Request, Response } from 'express';
import { get } from 'lodash';
import log from '../../logger';
import {
	createIngredient,
	findIngredient,
	findAndUpdateIngredient,
	deleteIngredient,
} from './ingredient.service';

/**
 * This function is used to request the creation of a new ingredient.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the ingredient.
 */
export async function createIngredientHandler(req: Request, res: Response) {
	const body = req.body;

	try {
		if ((await findIngredient({ name: body.name }))?.name === body.name) {
			return res.status(409).send('Ingredient already exists');
		}
		const ingredient = await createIngredient({ ...body });
		return res.send(ingredient);
	} catch (e) {
		log.error(e as string);
	}
}

/**
 * This function is used to request the update of a ingredient.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the updated ingredient.
 */
export async function updateIngredientHandler(req: Request, res: Response) {
	const ingredientId = get(req, 'query.ingredientId');
	const update = req.body;

	const ingredient = await findIngredient({ _id: ingredientId });

	if (!ingredient) {
		return res.status(404).send('No such ingredient exists');
	}

	if ((await findIngredient({ name: update.name }))?.name === update.name) {
		return res.status(409).send('Ingredient already exists');
	}

	const updatedIngredient = await findAndUpdateIngredient(
		{ _id: ingredientId },
		update,
		{
			new: true,
			// This is false because setting it true deprecated https://mongoosejs.com/docs/deprecations.html#findandmodify
			useFindAndModify: false,
		}
	);

	return res.send(updatedIngredient);
}

/**
 * This function is used to request a ingredient.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the ingredient.
 */
export async function getIngredientHandler(req: Request, res: Response) {
	const ingredientId = get(req, 'query.ingredientId');
	const ingredient = await findIngredient({ _id: ingredientId });

	if (!ingredient) {
		return res.status(404).send('No such ingredient exists');
	}

	return res.send(ingredient);
}

/**
 * This function is used to request the deletion of a ingredient.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with status 200 if successful
 */
export async function deleteIngredientHandler(req: Request, res: Response) {
	const ingredientId = get(req, 'query.ingredientId');

	const ingredient = await findIngredient({ _id: ingredientId });

	if (!ingredient) {
		return res.status(404).send('No such ingredient exists');
	}

	await deleteIngredient({ _id: ingredientId });

	return res.sendStatus(200);
}
