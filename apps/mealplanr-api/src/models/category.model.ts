import { Schema, Document, model } from 'mongoose';
import { ResponseModel } from './util/ResponseModel';

// Fields that exist both on the frontend and the backend
interface ICategoryShared {
	name: string;
	type: string[];
}

// Fields that exist only in the backend
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ICategoryBackend extends ICategoryShared {}

// Fields that exist only in the backend responses
interface ICategoryBackendResponse extends ICategoryBackend, ResponseModel {}

// Fields that exist only in the frontend.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ICategoryFrontend extends ICategoryShared {}

interface ICategoryDoc extends ICategoryBackend, Document {}

const CategorySchemaFields: Record<keyof ICategoryBackend, unknown> = {
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
};

const CategorySchema = new Schema(CategorySchemaFields);
const Category = model<ICategoryDoc>('categories', CategorySchema);

export {
	Category,
	ICategoryDoc,
	ICategoryShared,
	ICategoryFrontend,
	ICategoryBackend,
	ICategoryBackendResponse,
};
