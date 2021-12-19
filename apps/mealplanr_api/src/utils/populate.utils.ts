import { Query } from 'mongoose';

// TODO: add correct type to param
export function getDocumentRefs(
	mongooseSchema: any,
	nestedPath: string = ''
): string[] {
	let refs: string[] = [];

	// for all fields in the schema
	for (const key in mongooseSchema.paths) {
		const path = mongooseSchema.paths[key];
		// find sub-documents
		if (path.schema) {
			refs = refs.concat(getDocumentRefs(path.schema, `${key}.`));
		}
		// find names of the keys that reference other documents
		refs = refs.concat(getDocumentRefNames(path, key, nestedPath));
	}
	return refs;
}

function getDocumentRefNames(path: any, key: string, nestedPath: string) {
	let refs: string[] = [];
	for (const prop in path) {
		// if the prop has options and one of the options is a reference to another document
		if (prop === 'options' && path[prop].ref) {
			refs.push(`${nestedPath}${key}`);
		}
	}
	return refs;
}

export function populateDocumentResponse(
	model: Query<any, any> | any,
	userModelRefs: string[]
) {
	userModelRefs.forEach((ref: string) => {
		if (model != null) model.populate(ref);
	});

	return model;
}
