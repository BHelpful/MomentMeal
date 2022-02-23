import { Model, Document } from 'mongoose';
import sanitize = require('mongo-sanitize');

export abstract class ServiceCalls<EntityDocument> {
	protected documentModel!: Model<EntityDocument>;
	// TODO implement EntityType and correct formatter to return EntityType instead of EntityDocument
	protected formatter: any = Object;

	protected constructor(entityModel: Model<EntityDocument>) {
		this.documentModel = entityModel;
	}

	protected async create(model: EntityDocument): Promise<EntityDocument> {
		const document: Document = await this.documentModel.create(
			this.cleanToSave(model)
		);
		return new this.formatter(document);
	}

	protected async updateOne(_id: string, model: EntityDocument): Promise<void> {
		this.documentModel.updateOne({ _id }, this.cleanToSave(model));
	}

	protected async deleteOne(_id: string): Promise<{ n: number }> {
		return this.documentModel.deleteOne({ _id });
	}

	protected async find(
		sort: string,
		query: any,
		skip = 0,
		limit = 250
	): Promise<EntityDocument[]> {
		const sortObject = sanitize(sort)
			.split(',')
			.reduce((acc, curr) => {
				const [key, value] = curr.split(':');
				(acc as any)[key] = this.sortQueryFormatter(key, value);
				return acc;
			}, {});

		return this.documentModel
			.find(sanitize(query))
			.sort(Object.keys(sortObject).map((key) => [key, (sortObject as any)[key]]))
			.skip(skip)
			.limit(limit)
			.map((item) => new this.formatter(item));
	}

	protected async findOne<T>(query: any): Promise<EntityDocument> {
		const document = this.documentModel.findOne(query);
		if (!document) throw new Error();
		return new this.formatter(document);
	}

	protected async count(query: any): Promise<number> {
		return this.documentModel.count(sanitize(query));
	}

	protected cleanToSave(entity: EntityDocument): EntityDocument {
		const copy: EntityDocument = new this.formatter(entity);
		const loop = (value: any): any => {
			if (!value || typeof value !== 'object') return;
			/** formatting logic to save goes here */
			Object.keys(value).forEach((key) => loop(value[key]));
		};
		loop(copy);
		return copy;
	}

	protected sortQueryFormatter(key: string, value: string): number | undefined {
		if (value === 'asc') return 1;
		if (value === 'desc') return -1;
		return undefined; // just for static typing
	}
}