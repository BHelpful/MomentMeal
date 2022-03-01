import { Schema, Document, model } from 'mongoose';
import { ICategoryBackend } from './category.model';
import { ResponseModel } from './util/ResponseModel';

// Fields that exist both on the frontend and the backend
interface IIngredientShared {
	name: string;
	type: string | ICategoryBackend;
	season: string;
	diet: string[];
}

// Fields that exist only in the backend
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IIngredientBackend extends IIngredientShared {}

// Fields that exist only in the backend responses
interface IIngredientBackendResponse extends IIngredientBackend, ResponseModel {
	type: ICategoryBackend | string;
}

// Fields that exist only in the frontend.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IIngredientFrontend extends IIngredientShared {}

interface IIngredientDoc extends IIngredientBackend, Document {}

const IngredientSchemaFields: Record<keyof IIngredientBackend, unknown> = {
	name: {
		type: String,
		required: true,
		unique: true,
		description: 'Name of the ingredient',
	},
	type: {
		type: Schema.Types.ObjectId,
		ref: 'categories',
		required: true,
		description: 'ObjectId refering to categories',
	},
	season: {
		type: String,
		required: true,
		description: 'The season of the ingredient e.g. spring',
	},
	diet: {
		type: [String],
		required: true,
		description: 'The diet of the ingredient e.g. vegetarian',
	},
};

const IngredientSchema = new Schema(IngredientSchemaFields);
const Ingredient = model<IIngredientDoc>('ingredients', IngredientSchema);

export {
	Ingredient,
	IIngredientDoc,
	IIngredientShared,
	IIngredientBackend,
	IIngredientBackendResponse,
	IIngredientFrontend,
};
