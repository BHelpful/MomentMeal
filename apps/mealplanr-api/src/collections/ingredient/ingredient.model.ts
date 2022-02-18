import { Schema, Document, model } from 'mongoose';
import { CategoryDocument } from '../../models/category.model';

export interface IngredientDocument extends Document {
	_id: string;
	name: string;
	typeId: CategoryDocument['_id'];
	season: string;
	diet: [string];
}
export const IngredientSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		description: 'Name of the ingredient',
	},
	typeId: {
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
});

const ingredientModel = model<IngredientDocument>(
	'ingredients',
	IngredientSchema
);

export default ingredientModel;
