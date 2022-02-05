import { object, string, array } from 'yup';

// schema for file
const payload = {
	body: object({
		name: string(),
		type: array().of(string()),
	}),
};

const query = {
	query: object({
		fileId: string().required('fileId is required'),
	}),
};

export const createFileSchema = object({
	...payload,
});

export const getFileSchema = object({
	...query,
});

export const updateFileSchema = object({
	...query,
	...payload,
});

export const deleteFileSchema = object({
	...query,
});
