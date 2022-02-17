import { Schema, Document, model } from 'mongoose';

export interface StoreDocument extends Document {
	name: string;
}

export const StoreSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		description: 'Store name',
	},
});

export type StoreCreationParams = Pick<StoreDocument, 'name'>;

const storeModel = model<StoreDocument>('stores', StoreSchema);

export default storeModel;
