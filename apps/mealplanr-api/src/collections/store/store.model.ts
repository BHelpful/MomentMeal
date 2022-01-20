import { Schema, Document, model } from 'mongoose';
const m2s = require('mongoose-to-swagger');

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

const storeModel = model<StoreDocument>('stores', StoreSchema);

export const storeSM = m2s(storeModel);

export default storeModel;
