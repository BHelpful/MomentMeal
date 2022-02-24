import { IStoreBackend, IStoreDoc, Store } from '../models/store.model';
import { Service } from './Service';

export class StoresService extends Service<
	typeof Store,
	IStoreDoc,
	IStoreBackend
> {
	public constructor() {
		super(Store);
	}
}
