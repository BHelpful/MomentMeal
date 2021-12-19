import { Request, Response } from 'express';
import { get } from 'lodash';
import log from '../../logger';
import {
	createCategory,
	findCategory,
	findAndUpdateCategory,
	deleteCategory,
} from './category.service';

/**
 * This function is used to request the creation of a new category.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the category.
 */
export async function createCategoryHandler(req: Request, res: Response) {
	const body = req.body;

	try {
		if ((await findCategory({ name: body.name }))?.name === body.name) {
			return res.status(409).send('Category already exists');
		}
		const category = await createCategory({ ...body });
		return res.send(category);
	} catch (e) {
		log.error(e as string);
	}
}

/**
 * This function is used to request the update of a category.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the updated category.
 */
export async function updateCategoryHandler(req: Request, res: Response) {
	const categoryId = get(req, 'query.categoryId');
	const update = req.body;

	const category = await findCategory({ _id: categoryId });

	if (!category) {
		return res.status(404).send('No such category exists');
	}

	if ((await findCategory({ name: update.name }))?.name === update.name) {
		return res.status(409).send('Category already exists');
	}

	const updatedCategory = await findAndUpdateCategory(
		{ _id: categoryId },
		update,
		{
			new: true,
			// This is false because setting it true deprecated https://mongoosejs.com/docs/deprecations.html#findandmodify
			useFindAndModify: false,
		}
	);

	return res.send(updatedCategory);
}

/**
 * This function is used to request a category.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with the category.
 */
export async function getCategoryHandler(req: Request, res: Response) {
	const categoryId = get(req, 'query.categoryId');
	const category = await findCategory({ _id: categoryId });

	if (!category) {
		return res.status(404).send('No such category exists');
	}

	return res.send(category);
}

/**
 * This function is used to request the deletion of a category.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns a response with status 200 if successful
 */
export async function deleteCategoryHandler(req: Request, res: Response) {
	const categoryId = get(req, 'query.categoryId');

	const category = await findCategory({ _id: categoryId });

	if (!category) {
		return res.status(404).send('No such category exists');
	}

	await deleteCategory({ _id: categoryId });

	return res.sendStatus(200);
}
