import { omit } from 'lodash';
import {
	IUserResponse,
	IUserDoc,
	User,
	IUserModel,
} from '../models/user.model';
import { Service } from './Repository/Service';

export class UserService extends Service<IUserDoc, IUserModel, IUserResponse> {
	public constructor() {
		super(User);
	}

	public async populate(document: IUserDoc): Promise<IUserResponse> {
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

	public async validatePassword(
		email: string,
		password: string
	): Promise<IUserResponse | boolean> {
		const user = await super.findOne({ email });

		if (!user) {
			return false;
		}

		const isValid = await user.comparePassword(password);

		if (!isValid) {
			return false;
		}

		return omit(user, 'password');
	}
}
