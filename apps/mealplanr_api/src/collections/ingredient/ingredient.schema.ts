import { object, string, array } from 'yup';

// schema for ingredient
const payload = {
	body: object({
		name: string(),
		typeId: string(),
		season: string(),
		diet: array().of(string()),
		alternativesId: array().of(string()),
	}),
};

const query = {
	query: object({
		ingredientId: string().required('ingredientId is required'),
	}),
};

export const createIngredientSchema = object({
	...payload,
});

export const getIngredientSchema = object({
	...query,
});

export const updateIngredientSchema = object({
	...query,
	...payload,
});

export const deleteIngredientSchema = object({
	...query,
});
