import { Schema, Document, model } from 'mongoose';

export interface CategoryDocument extends Document {
	name: string;
	type: string[];
}
export const CategorySchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		description: 'Name of the category',
	},
	type: {
		type: [String],
		required: true,
		description:
			'The type of category (can have multiple e.g. spicy, appetizer ...)',
	},
});

export type CategoryCreationParams = Pick<CategoryDocument, 'name' | 'type'>;

const categoryModel = model<CategoryDocument>('categories', CategorySchema);

export default categoryModel;
