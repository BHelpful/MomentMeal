import {
	ICategoryBackend,
	ICategoryBackendResponse,
	ICategoryDoc,
	Category,
} from '../models/category.model';
import { Service } from './Repository/Service';

export class CategoryService extends Service<
	ICategoryDoc,
	ICategoryBackend,
	ICategoryBackendResponse
> {
	public constructor() {
		super(Category);
	}

	public async populate(document: ICategoryDoc): Promise<ICategoryDoc> {
		return document;
	}
}
