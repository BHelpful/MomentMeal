import { Schema, Document, model } from 'mongoose';
import { nanoid } from 'nanoid';
import { getDocumentRefs } from '../../utils/populate.utils';
const m2s = require('mongoose-to-swagger');
import { CategoryDocument } from '../category/category.model';
import {
	IngredientListSubschema,
	RatingDocument,
	RatingSubschema,
} from '../documents';
import { IngredientDocument } from '../ingredient/ingredient.model';
import { UserDocument } from '../user/user.model';

export interface RecipeDocument extends Document {
	recipeId: string;
	public: boolean;
	categoriesId: [CategoryDocument['_id']];
	creatorId: UserDocument['_id'];
	title: string;
	description: string;
	estimate: [string];
	images: [Buffer];
	ingredients: [IngredientDocument['_id']];
	preparation: [string];
	instructions: [string];
	rating: [RatingDocument];
	servings: number;
	sidedishesId: [RecipeDocument['_id']];
	createdAt: Date;
	updatedAt: Date;
}
export const RecipeSchema = new Schema(
	{
		recipeId: {
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
		categoriesId: {
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
			type: [Schema.Types.Buffer],
			description: 'Large storage type to store images of the recipe',
		},
		ingredients: {
			type: [IngredientListSubschema],
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
			type: [RatingSubschema],
			description: 'Ratings of the recipe',
		},
		servings: {
			type: Number,
			required: true,
			description: 'Number of servings',
		},
		sidedishesId: {
			type: [Schema.Types.ObjectId],
			ref: 'recipes',
			description:
				'List of recipes that can be used as sidedish (ObjectId refering to recipes)',
		},
	},
	{ timestamps: true }
);

export const recipeModelRefs = getDocumentRefs(RecipeSchema);

const recipeModel = model<RecipeDocument>('recipes', RecipeSchema);

export const recipeSM = m2s(recipeModel);

export default recipeModel;
