import { omit } from 'lodash';

export type crudMethods = 'get' | 'post' | 'put' | 'delete';
export type QueryId = { required: boolean; id?: string };
export type RequiredModel = {
	required: boolean;
	model?: any;
	omit?: string[];
};

export type swaggerObjectParamType = {
	CRUD: crudMethods;
	item: string;
	tag: string;
	summary: string;
	description: string;
	requiresUser: boolean;
	queryId: QueryId;
	body: RequiredModel;
	respondObject: RequiredModel;
	invalidResponses: any;
};

/**
 * @description Generates a swagger object for a given CRUD method
 * @brief The "_id" of the object and all sub-objects is being removed from the swagger object in the method
 * @param {swaggerObjectParamType} param
 * @returns {any} Swagger object
 */
export function getSwaggerObject(param: swaggerObjectParamType): any {
	let obj: any = { crud: {} };
	obj.crud = {
		...{
			summary: param.summary,
			description: param.description,
			tags: [param.tag],
			produces: ['application/json'],
			parameters: [],
			responses: {
				'200': {
					description: 'OK',
				},
				...param.invalidResponses,
			},
		},
	};

	if (param.queryId.required) {
		obj.crud.parameters.push({
			name: param.queryId.id,
			in: 'query',
			description: `Id of the ${param.item}`,
			required: true,
			type: 'string',
		});
	}

	param.body.omit = param.body?.omit ?? [];
	if (param.body.required && param.body?.omit) {
		param.body.omit.push('_id', 'updatedAt', 'createdAt');
		param.body.omit.forEach((part, index, theArray) => {
			theArray[index] = `properties.${part}`;
		});

		// Copy object to avoid mutating original
		let tempModel = JSON.parse(JSON.stringify(param.body.model));

		tempModel.properties = remIdAndTimestampFromProp(tempModel.properties);

		obj.crud.parameters.push({
			name: 'body',
			in: 'body',
			description: `Create ${param.item} body object`,
			required: true,
			schema: omit(tempModel, param.body.omit),
		});
	}

	param.respondObject.omit = param.respondObject?.omit ?? [];
	if (param.respondObject.required && param.respondObject?.omit) {
		param.respondObject.omit.forEach((part, index, theArray) => {
			theArray[index] = `properties.${part}`;
		});
		obj.crud.responses['200'].schema = omit(
			param.respondObject.model,
			param.respondObject.omit
		);
	}

	if (param.requiresUser) {
		obj.crud.parameters.push(
			{
				in: 'header',
				name: 'x-refresh',
				description: 'refreshToken',
				required: true,
				schema: {
					type: 'string',
					format: 'uuid',
				},
			},
			{
				in: 'header',
				name: 'authorization',
				description: 'accessToken',
				required: true,
				schema: {
					type: 'string',
					format: 'uuid',
				},
			}
		);
	}

	switch (param.CRUD) {
		case 'get':
			obj.get = obj.crud;
			break;
		case 'put':
			obj.put = obj.crud;
			break;
		case 'post':
			obj.post = obj.crud;
			break;
		case 'delete':
			obj.delete = obj.crud;
			break;
	}

	delete obj.crud;
	return obj;
}

/**
 * Removes the id property from nested properties
 * @param properties
 *
 * @returns {any} the properties without the id property
 */
function remIdAndTimestampFromProp(properties: any): any {
	for (const [key] of Object.entries(properties)) {
		if (properties[key].type === 'array') {
			if (properties[key]?.items?.properties) {
				properties[key].items.properties = remIdAndTimestampFromProp(
					properties[key].items.properties
				);
				properties[key].items.properties = omit(
					properties[key].items.properties,
					['_id', 'updatedAt', 'createdAt']
				);
			}
		}

		if (properties[key].type === 'object') {
			if (properties[key]?.properties) {
				properties[key].properties = remIdAndTimestampFromProp(
					properties[key].properties
				);
				properties[key].properties = omit(properties[key].properties, [
					'_id',
					'updatedAt',
					'createdAt',
				]);
			}
		}
	}
	return properties;
}
