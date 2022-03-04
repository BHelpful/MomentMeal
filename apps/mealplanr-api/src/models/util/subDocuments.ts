import { Schema } from 'mongoose';
import {
	IIngredientBackend,
	IIngredientBackendResponse,
} from '../ingredient.model';
import { IRecipeBackend, IRecipeBackendResponse } from '../recipe.model';
import { IStoreBackend, IStoreBackendResponse } from '../store.model';

// ! Documents------------------------------------------------------------------
// This contains the different subschemas (documents) used in the different schemas (collections) of mongoDB. E.g. the collection of a user contains a document for options.
export interface UserOptionsAddress {
	streetName: string;
	houseNumber: number;
	postalCode: string;
}

export type UserOptionsAddressResponse = UserOptionsAddress;

export const UserOptionsAddressSubSubSchema = new Schema({
	streetName: {
		type: String,
		required: true,
		description: 'The street name where the user lives',
	},
	houseNumber: {
		type: Number,
		required: true,
		description: 'The house number',
	},
	postalCode: {
		type: String,
		required: true,
		description: 'Postal code of the address',
	},
});

export interface UserOptions {
	diet: string;
	theme: string;
	country: string;
	notifications: boolean;
	address: UserOptionsAddress;
	stores: string | IStoreBackend[];
	gCalendar: boolean;
}
export interface UserOptionsResponse extends UserOptions {
	address: UserOptionsAddressResponse;
	stores: IStoreBackendResponse[] | string;
}

const UserOptionsSubSchemaFields: Record<keyof UserOptions, unknown> = {
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
		description: 'Whether or not the user wants to receive notifications',
	},
	address: {
		type: UserOptionsAddressSubSubSchema,
		description: 'Address of the user',
	},
	stores: {
		type: [Schema.Types.ObjectId],
		ref: 'stores',
		description: 'List of stores the user is wants to shop in.',
	},
	gCalendar: {
		type: Boolean,
		description: 'Is the user subscribed to Google Calendar',
	},
};
export const UserOptionsSubSchema = new Schema(UserOptionsSubSchemaFields);

export interface Plan {
	recipes: string[] | IRecipeBackend[];
	dateDex: Date;
}
export interface PlanResponse extends Plan {
	recipes: IRecipeBackendResponse[] | string[];
}

const PlanSubSchemaFields: Record<keyof Plan, unknown> = {
	recipes: {
		type: [Schema.Types.ObjectId],
		ref: 'recipes',
		required: true,
		description: 'The recipes that are part of this plan.',
	},
	dateDex: {
		type: Schema.Types.Date,
		required: true,
		description:
			'The start date of the plan (this defines what the 7 days of the plan is going to be)',
	},
};
export const PlanSubSchema = new Schema(PlanSubSchemaFields);

export interface IngredientList {
	ingredient: string | IIngredientBackend;
	amount: number;
	unit: string;
	storeId: string | IStoreBackend;
}
export interface IngredientListResponse extends IngredientList {
	ingredient: IIngredientBackendResponse | string;
	storeId: IStoreBackendResponse | string;
}

const IngredientListSubSchemaFields: Record<keyof IngredientList, unknown> = {
	ingredient: {
		type: Schema.Types.ObjectId,
		ref: 'ingredients',
		required: true,
		description: 'ObjectId referring to ingredients',
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
};
export const IngredientListSubSchema = new Schema(
	IngredientListSubSchemaFields
);

export interface ShoppingList {
	ingredients: IngredientList[];
}

export interface ShoppingListResponse extends ShoppingList {
	ingredients: IngredientListResponse[];
}

const ShoppingListSubSchemaFields: Record<keyof ShoppingList, unknown> = {
	ingredients: {
		type: [IngredientListSubSchema],
		required: true,
		description: 'List of ingredients',
	},
};
export const ShoppingListSubSchema = new Schema(ShoppingListSubSchemaFields);

export interface Rating {
	userId: string;
	rating: number;
}
export type RatingResponse = Rating;

const RatingSubSchemaFields: Record<keyof Rating, unknown> = {
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true,
		description: 'The user who rated the recipe. (ObjectId referring to users)',
	},
	rating: { type: Number, required: true, description: 'Rating from 1 to 5' },
};
export const RatingSubSchema = new Schema(RatingSubSchemaFields);
