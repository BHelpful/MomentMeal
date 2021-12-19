import { object, string, array } from 'yup';

// schema for category
const payload = {
	body: object({
		name: string(),
		type: array().of(string()),
	}),
};

const query = {
	query: object({
		categoryId: string().required('categoryId is required'),
	}),
};

export const createCategorySchema = object({
	...payload,
});

export const getCategorySchema = object({
	...query,
});

export const updateCategorySchema = object({
	...query,
	...payload,
});

export const deleteCategorySchema = object({
	...query,
});
