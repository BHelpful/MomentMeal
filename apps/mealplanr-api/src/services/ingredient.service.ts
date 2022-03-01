import {
	IIngredientBackend,
	IIngredientBackendResponse,
	IIngredientDoc,
	Ingredient,
} from '../models/ingredient.model';
import { Service } from './Repository/Service';

export class IngredientService extends Service<
	IIngredientDoc,
	IIngredientBackend,
	IIngredientBackendResponse
> {
	public constructor() {
		super(Ingredient);
	}

	public async populate(document: IIngredientDoc): Promise<IIngredientBackendResponse> {
		return document.populate('typeId');
	}
}
