import { Schema, Document, model } from 'mongoose';

export interface StoreDocument extends Document {
	_id: string;
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

const storeModel = model<StoreDocument>('stores', StoreSchema);

export default storeModel;
