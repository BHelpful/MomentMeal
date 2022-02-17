import { Schema, Document, model } from 'mongoose';

export interface Store {
	name: string;
}
export interface StoreDocument extends Store, Document {}

export const StoreSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		description: 'Store name',
	},
});

export type StoreCreationParams = Pick<Store, 'name'>;

const storeModel = model<StoreDocument>('stores', StoreSchema);

export default storeModel;
