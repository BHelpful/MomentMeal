import { Schema, Document, model } from 'mongoose';
import { ResponseModel } from './util/ResponseModel';

// Fields that exist both on the frontend and the backend
interface IStoreShared {
	name: string;
}

// Fields that exist only in the backend
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IStoreBackend extends IStoreShared {}

// Fields that exist only in the backend responses
interface IStoreBackendResponse extends IStoreBackend, ResponseModel {}

// Fields that exist only in the frontend.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IStoreFrontend extends IStoreShared {}

interface IStoreDoc extends IStoreBackend, Document {}

const StoreSchemaFields: Record<keyof IStoreBackend, unknown> = {
	name: {
		type: String,
		required: true,
		unique: true,
		description: 'Store name',
	},
};

const StoreSchema = new Schema(StoreSchemaFields);
const Store = model<IStoreDoc>('stores', StoreSchema);

export {
	Store,
	IStoreDoc,
	IStoreShared,
	IStoreBackend,
	IStoreBackendResponse,
	IStoreFrontend,
};
