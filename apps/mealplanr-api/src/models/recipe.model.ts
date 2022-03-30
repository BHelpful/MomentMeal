import { Schema, Document, model } from 'mongoose';
import { nanoid } from 'nanoid';
import { ICategoryBackend, ICategoryBackendResponse } from './category.model';
import {
	IngredientList,
	IngredientListResponse,
	IngredientListSubSchema,
	Rating,
	RatingResponse,
	RatingSubSchema,
} from './util/subDocuments';
import { ResponseModel } from './util/ResponseModel';

interface IRecipeShared {
	ID?: string;
	public: boolean;
	categories: string[] | ICategoryBackend[];
	creatorId: string;
	title: string;
	description: string;
	estimate: string[];
	images: string[];
	ingredients: IngredientList[];
	preparation: string[];
	instructions: string[];
	rating?: Rating[];
	servings: number;
	sideDishes?: string[];
}

// Fields that exist only in the backend
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IRecipeBackend extends IRecipeShared {}

// Fields that exist only in the backend responses
interface IRecipeBackendResponse extends IRecipeBackend, ResponseModel {
	categories: ICategoryBackendResponse[] | string[];
	ingredients: IngredientListResponse[];
	rating?: RatingResponse[];
}

// Fields that exist only in the frontend.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IRecipeFrontend extends IRecipeShared {}

interface IRecipeDoc extends IRecipeBackend, Document {}

const RecipeSchemaFields: Record<keyof IRecipeBackend, unknown> = {
	ID: {
		type: String,
		required: true,
		unique: true,
		default: () => nanoid(10),
		description: 'The id of the recipe',
	},
	public: {
		type: Boolean,
		required: true,
		default: false,
		description: 'Whether the recipe should be publicly available',
	},
	categories: {
		type: [Schema.Types.ObjectId],
		ref: 'categories',
		description: 'ObjectId refering to categories collection',
	},
	creatorId: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true,
		description: 'ObjectId refering to users collection',
	},
	title: {
		type: String,
		required: true,
		description: 'Title of the recipe',
	},
	description: {
		type: String,
		required: true,
		description: 'Description of the recipe',
	},
	estimate: {
		type: [String],
		required: true,
		description:
			'Estimated time of the recipe (arr[0] is time, arr[1] is 1 or 2 mapped to m, h)',
	},
	images: {
		type: [String],
		description: 'Image links to internal uploaded images',
	},
	ingredients: {
		type: [IngredientListSubSchema],
		required: true,
		description: 'List of ingredients',
	},
	preparation: { type: [String], description: 'Preparation steps' },
	instructions: {
		type: [String],
		required: true,
		description: 'Instructions for the recipe',
	},
	rating: {
		type: [RatingSubSchema],
		description: 'Ratings of the recipe',
	},
	servings: {
		type: Number,
		required: true,
		description: 'Number of servings',
	},
	sideDishes: {
		type: [Schema.Types.ObjectId],
		ref: 'recipes',
		description:
			'List of recipes that can be used as sidedish (ObjectId refering to recipes)',
	},
};

const RecipeSchema = new Schema(RecipeSchemaFields, { timestamps: true });
const Recipe = model<IRecipeDoc>('recipes', RecipeSchema);

export {
	Recipe,
	IRecipeDoc,
	IRecipeBackend,
	IRecipeBackendResponse,
	IRecipeFrontend,
};
