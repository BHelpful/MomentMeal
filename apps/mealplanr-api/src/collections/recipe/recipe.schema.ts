import { object, string, boolean, array, number } from 'yup';

// schema for recipe
const payload = {
	body: object({
		public: boolean(),
		categoriesId: array().of(string()),
		title: string().required('Title is required'),
		description: string().required('Description is required'),
		estimate: array().of(string()).required('Estimated time is required'),
		// TODO figure out how to validate this (the type stored is buffer)
		images: array().of(string()),
		ingredients: array()
			.of(
				object({
					ingredientId: string().required('Ingredient is required'),
					amount: number().required(
						'Amount of ingredient is required'
					),
					unit: string().required('Unit of ingredient is required'),
				})
			)
			.required('Ingredients are required'),
		preparation: array().of(string()),
		instructions: array()
			.of(string())
			.required('Instructions are required'),
		servings: number().required('Servings are required'),
		sidedishesId: array().of(string()),
	}),
};

const query = {
	query: object({
		recipeId: string().required('recipeId is required'),
	}),
};

export const createRecipeSchema = object({
	...payload,
});

export const getRecipeSchema = object({
	...query,
});

export const updateRecipeSchema = object({
	...query,
	...payload,
});

export const deleteRecipeSchema = object({
	...query,
});
