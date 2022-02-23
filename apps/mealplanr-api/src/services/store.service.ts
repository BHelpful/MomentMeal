import storeModel, {
	StoreCreationParams,
	StoreDocument,
} from '../models/store.model';
import { Service } from './Service';

export class StoresService extends Service<StoreDocument, StoreCreationParams> {
	public constructor() {
		super(storeModel);
	}
}
