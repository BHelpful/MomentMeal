import {
	FilterQuery,
	UpdateQuery,
	QueryOptions,
	Model,
	Document,
} from 'mongoose';
import sanitize from 'mongo-sanitize';

export class Repository<EntityDocument, EntityParams> {
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
	public async findOne(
		query: FilterQuery<EntityParams>
	): Promise<EntityDocument> {
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
	public async create(
		body: FilterQuery<EntityParams>
	): Promise<EntityDocument> {
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
		query: FilterQuery<EntityParams>,
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

	public async count(query: FilterQuery<Document>): Promise<number> {
		return this.model.count(sanitize(query));
	}

	/**
	 * This function will find, update and return a entity
	 *
	 * @param query - a query object that will be used to find a entity from the DB
	 * @param update - a query object that will be used to specify the update
	 * @param options - options for the findOne function from mongoose
	 * @returns a entity document
	 */
	public async update(
		_id: string,
		update: UpdateQuery<EntityDocument>,
		options?: QueryOptions
	): Promise<EntityDocument> {
		try {
			return (await this.model.findByIdAndUpdate(_id, sanitize(update), {
				...sanitize(options),
				new: true,
				// This is false because setting it true deprecated https://mongoosejs.com/docs/deprecations.html#findandmodify
				useFindAndModify: false,
			})) as EntityDocument;
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

	/**
	 * This function will check if entity exists
	 *
	 * @param identifier - id that will be used to find a entity from the DB
	 * @returns a boolean
	 */
	public async exists(
		identifier: { _id: string } | { ID: string }
	): Promise<boolean> {
		return this.model.exists({ identifier });
	}
}
