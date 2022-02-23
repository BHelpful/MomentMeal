import {
	DocumentDefinition,
	FilterQuery,
	UpdateQuery,
	QueryOptions,
	Model,
} from 'mongoose';
import sanitize from 'mongo-sanitize';

export class ServiceCalls<EntityDocument, EntityParams> {
	protected model: Model<EntityDocument>;

	constructor(model: Model<EntityDocument>) {
		this.model = model;
	}

	/**
	 * This function will find an entity and return it
	 *
	 * @param query - a query object that will be used to find a entity from the DB
	 * @returns an entity document
	 */
	public async findOne(query: FilterQuery<EntityDocument>) {
		const document = await this.model.findOne(sanitize(query));
		if (!document) throw new Error();
		return document;
	}

	/**
	 * This function will create a new entity and return the entity
	 *
	 * @param body - The body of the entity (based on the model)
	 * @returns a entity document
	 */
	public async create(body: DocumentDefinition<EntityParams>) {
		try {
			return await this.model.create(sanitize(body));
		} catch (error) {
			throw new Error(error as string);
		}
	}

	/**
	 * This function will find a list of entities and return them
	 *
	 * @param query - a query object that will be used to find a entity from the DB
	 * @param sort - string to sort by
	 * @param skip - amount of documents to skip
	 * @param limit - amount of documents to limit
	 * @returns a list of entity documents
	 */
	public async find(
		query: FilterQuery<EntityDocument>,
		sort: string,
		skip = 0,
		limit = 250
	): Promise<EntityDocument[]> {
		const sortObject = sanitize(sort);
		return this.model
			.find(sanitize(query))
			.sort(
				Object.keys(sortObject).map((key) => [key, sortObject[parseInt(key)]])
			)
			.skip(skip)
			.limit(limit);
	}

	public async count(query: FilterQuery<EntityDocument>): Promise<number> {
		return this.model.count(sanitize(query));
	}

	public async update(
		_id: string,
		model: UpdateQuery<EntityDocument>,
		options?: QueryOptions
	) {
		try {
			return this.model.findOneAndUpdate({ _id }, sanitize(model), {
				...sanitize(options),
				new: true,
				// This is false because setting it true deprecated https://mongoosejs.com/docs/deprecations.html#findandmodify
				useFindAndModify: false,
			});
		} catch (error) {
			throw new Error(error as string);
		}
	}

	/**
	 * This function will find and delete an entity
	 *
	 * @param _id - id that will be used to find a entity from the DB
	 * @returns a entity document
	 */
	public async delete(_id: string): Promise<{ n: number }> {
		try {
			return this.model.deleteOne({ _id });
		} catch (error) {
			throw new Error(error as string);
		}
	}
}
