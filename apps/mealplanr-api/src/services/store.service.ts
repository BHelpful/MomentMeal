import {
	IStoreBackend,
	IStoreBackendResponse,
	IStoreDoc,
	Store,
} from '../models/store.model';
import { Service } from './Repository/Service';

export class StoreService extends Service<
	IStoreDoc,
	IStoreBackend,
	IStoreBackendResponse
> {
	public constructor() {
		super(Store);
	}

	public async populate(document: IStoreDoc): Promise<IStoreDoc> {
		return document;
	}
}
