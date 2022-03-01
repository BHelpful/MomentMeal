import {
	IUserBackend,
	IUserBackendResponse,
	IUserDoc,
	User,
} from '../models/user.model';
import { Service } from './Repository/Service';

export class UserService extends Service<
	IUserDoc,
	IUserBackend,
	IUserBackendResponse
> {
	public constructor() {
		super(User);
	}

	public async populate(document: IUserDoc): Promise<IUserBackendResponse> {
		return document
			.populate({
				path: 'recipeCollection',
				populate: {
					path: 'ingredients.ingredient',
					populate: { path: 'type' },
				},
			})
			.populate('options.stores')
			.populate('plan.recipes')
			.populate('availableIngredients')
			.populate({
				path: 'availableIngredients',
				populate: { path: 'type' },
			})
			.populate({
				path: 'shoppingList.ingredients.ingredient',
				populate: { path: 'type' },
			})
			.populate('shoppingList.ingredients.store')
			.populate('plan')
			.populate({
				path: 'plan.recipes',
				populate: {
					path: 'ingredients.ingredient',
					populate: { path: 'type' },
				},
			})
			.execPopulate();
	}
}
