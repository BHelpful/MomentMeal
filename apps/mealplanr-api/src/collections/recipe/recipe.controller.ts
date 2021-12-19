import { Request, Response } from 'express';
import { get } from 'lodash';
import {
	createRecipe,
	findRecipe,
	findAndUpdateRecipe,
	deleteRecipe,
} from './recipe.service';
/**
 * This function is used to request the creation of a new recipe.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the recipe.
 */
export async function createRecipeHandler(req: Request, res: Response) {
	const userId = get(req, 'user._id');
	const body = req.body;

	const recipe = await createRecipe({ ...body, creatorId: userId });

	return res.send(recipe);
}

/**
 * This function is used to request the update of a recipe.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the updated recipe.
 */
export async function updateRecipeHandler(req: Request, res: Response) {
	const userId = get(req, 'user._id');
	const recipeId = get(req, 'query.recipeId');
	const update = req.body;

	const recipe = await findRecipe({ recipeId });

	if (!recipe) {
		return res.status(404).send('No such recipe exists');
	}

	if (String(recipe.creatorId) !== userId) {
		return res.status(401).send('User not the creator of the recipe');
	}

	const updatedRecipe = await findAndUpdateRecipe({ recipeId }, update, {
		new: true,
		// useFindAndModify is false because setting it true is deprecated https://mongoosejs.com/docs/deprecations.html#findandmodify
		useFindAndModify: false,
	});

	return res.send(updatedRecipe);
}

/**
 * This function is used to request a recipe.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the recipe.
 */
export async function getRecipeHandler(req: Request, res: Response) {
	const recipeId = get(req, 'query.recipeId');
	const recipe = await findRecipe({ recipeId });

	if (!recipe) {
		return res.status(404).send('No such recipe exists');
	}

	return res.send(recipe);
}

/**
 * This function is used to request the deletion of a recipe.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with status 200 if successful
 */
export async function deleteRecipeHandler(req: Request, res: Response) {
	const userId = get(req, 'user._id');
	const recipeId = get(req, 'query.recipeId');

	const recipe = await findRecipe({ recipeId });

	if (!recipe) {
		return res.status(404).send('No such recipe exists');
	}

	if (String(recipe.creatorId) !== String(userId)) {
		return res.status(401).send('User not the creator of the recipe');
	}

	await deleteRecipe({ recipeId });

	return res.sendStatus(200);
}
