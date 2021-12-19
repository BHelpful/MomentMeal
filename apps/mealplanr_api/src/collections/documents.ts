import { Schema, Document } from 'mongoose';
import { IngredientDocument } from './ingredient/ingredient.model';
import { RecipeDocument } from './recipe/recipe.model';
import { StoreDocument } from './store/store.model';
import { UserDocument } from './user/user.model';

// ! Documents------------------------------------------------------------------
// This contains the different subschemas (documents) used in the different schemas (collections) of mongoDB. E.g. the collection of a user contains a document for options.
export interface UserOptionsAddressDocument extends Document {
	streetname: string;
	housenumber: number;
	postalcode: string;
}
export const UserOptionsAddressSubschema = new Schema({
	streetname: {
		type: String,
		required: true,
		description: 'The street name where the user lives',
	},
	housenumber: {
		type: Number,
		required: true,
		description: 'The house number',
	},
	postalcode: {
		type: String,
		required: true,
		description: 'Postal code of the address',
	},
});

export interface UserOptionsDocument extends Document {
	diet: string;
	country: string;
	notifications: boolean;
	address: UserOptionsAddressDocument;
	storesId: [StoreDocument['_id']];
	gCalendar: boolean;
}
export const UserOptionsSubschema = new Schema({
	diet: {
		type: String,
		description: 'The diet of the user.',
	},
	theme: {
		type: String,
		description: 'The theme of the UI for the user.',
	},
	country: {
		type: String,
		description: 'Country of the user',
	},
	notifications: {
		type: Boolean,
		description: 'Whether or not the user wants to recieve notifications',
	},
	address: {
		type: UserOptionsAddressSubschema,
		description: 'Address of the user',
	},
	storesId: {
		type: [Schema.Types.ObjectId],
		ref: 'stores',
		description: 'List of stores the user is wants to shop in.',
	},
	gCalendar: {
		type: Boolean,
		description: 'Is the user subscribed to Google Calendar',
	},
});

export interface PlanDocument extends Document {
	recipesId: [RecipeDocument['_id']];
	datedex: Date;
}
export const PlanSubschema = new Schema({
	recipesId: {
		type: [Schema.Types.ObjectId],
		ref: 'recipes',
		required: true,
		description: 'The recipes that are part of this plan.',
	},
	datedex: {
		type: Schema.Types.Date,
		required: true,
		description:
			'The start date of the plan (this defines what the 7 days of the plan is going to be)',
	},
});

export interface IngredientListDocument extends Document {
	ingredientId: IngredientDocument['_id'];
	amount: number;
	unit: string;
	storeId: StoreDocument;
}
export const IngredientListSubschema = new Schema({
	ingredientId: {
		type: Schema.Types.ObjectId,
		ref: 'ingredients',
		required: true,
		description: 'ObjectId refering to ingredients',
	},
	amount: {
		type: Number,
		required: true,
		description: 'The amount of the ingredient.',
	},
	unit: {
		type: String,
		required: true,
		description: 'The unit of the amount of the ingredient.',
	},
	storeId: {
		type: Schema.Types.ObjectId,
		ref: 'stores',
		description: 'The store relevant to the ingredient',
	},
});

export interface ShoppingListDocument extends Document {
	ingredients: [IngredientListDocument];
}
export const ShoppingListSubschema = new Schema({
	ingredients: {
		type: [IngredientListSubschema],
		required: true,
		description: 'List of ingredients',
	},
});

export interface RatingDocument extends Document {
	userId: UserDocument['_id'];
	rating: number;
}
export const RatingSubschema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true,
		description:
			'The user who rated the recipe. (ObjectId refering to users)',
	},
	rating: { type: Number, required: true, description: 'Rating from 1 to 5' },
});
