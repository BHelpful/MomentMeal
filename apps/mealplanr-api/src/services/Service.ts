import { Model } from 'mongoose';
import { PaginationModel } from '../models/PaginationModel';
import { ServiceCalls } from './ServiceCalls';

export abstract class Service<EntityDocument> extends ServiceCalls<EntityDocument> {

  public constructor(entityModel: Model<EntityDocument>) {
    super(entityModel);
  }

	public async getById(_id: string): Promise<EntityDocument> {
		return this.findOne({ _id });
	}

	public async getPaginated(
		page: number,
		limit: number,
		fields: string,
		sort: string,
		query: string
	): Promise<PaginationModel> {
		const skip: number = (Math.max(1, page) - 1) * limit;
    const count = await this.count(query);
		let docs = await this.find(sort, query, skip, limit);
		const fieldArray = (fields || '')
			.split(',')
			.map((field) => field.trim())
			.filter(Boolean);
		if (fieldArray.length)
			docs = docs.map((d) => {
				const attrs: any = {};
				fieldArray.forEach((f) => (attrs[f] = (d as any)[f]));
				return attrs;
			});
		return new PaginationModel({
			count,
			page,
			limit,
			docs,
			totalPages: Math.ceil(count / limit),
		});
	}

	public async create(entity: EntityDocument): Promise<EntityDocument> {
		const res = await this.create(entity);
		return this.getById((res as any)._id);
	}

	public async update(id: string, entity: EntityDocument): Promise<EntityDocument> {
		await this.updateOne(id, entity);
		return this.getById(id);
	}

	public async delete(id: string): Promise<void> {
		const res = await this.deleteOne(id);
		if (!res.n) throw new Error();
	}
}
