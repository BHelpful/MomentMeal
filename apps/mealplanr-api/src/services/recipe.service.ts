import {
	IRecipeBackend,
	IRecipeBackendResponse,
	IRecipeDoc,
	Recipe,
} from '../models/recipe.model';
import { Service } from './Repository/Service';

export class RecipeService extends Service<
	IRecipeDoc,
	IRecipeBackend,
	IRecipeBackendResponse
> {
	public constructor() {
		super(Recipe);
	}

	public async populate(document: IRecipeDoc): Promise<IRecipeBackendResponse> {
		return document
			.populate('categories')
			.populate('creatorId')
			.populate({
				path: 'ingredients.ingredient',
				populate: { path: 'type' },
			})
			.populate({
				path: 'sideDishes',
				populate: {
					path: 'ingredients.ingredient',
					populate: { path: 'type' },
				},
			})
			.execPopulate();
	}

	// The "_id" is changed to "ID" for recipes, as the ID field is the unique identifier for the recipe.
	public async exists(ID: string): Promise<boolean> {
		return this.repository.exists({ ID });
	}
}
