import {
	ICategoryBackend,
	ICategoryDoc,
	Category,
} from '../models/category.model';
import { Service } from './Service';

export class CategoriesService extends Service<
	typeof Category,
	ICategoryDoc,
	ICategoryBackend
> {
	public constructor() {
		super(Category);
	}
}
