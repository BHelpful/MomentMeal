const { NX_MP_API_URI } = process.env;

export const recipeDefaults = {
	__v: 0,
	_id: 'a',
	categoriesId: [],
	createdAt: '',
	creatorId: '',
	description: '',
	estimate: [''],
	images: [''],
	ingredients: [],
	instructions: [''],
	preparation: [''],
	public: false,
	rating: [0, 0],
	recipeId: '',
	servings: 4,
	sidedishesId: [''],
	title: '',
	updatedAt: '',
};

export const recipesDefaults = {
	count: 1,
	page: 1,
	limit: 1,
	totalPages: 1,
	docs: [recipeDefaults],
};

export type RecipeType = typeof recipeDefaults;
export type RecipesType = typeof recipesDefaults;

export interface RecipeListType extends Array<RecipeType> {
	[key: number]: RecipeType;
}

export interface MealplanType extends RecipeType {
	time: string;
}

export interface MealplanListType extends Array<MealplanType> {
	[key: number]: MealplanType;
}

export const getRecipe = (
	id: string,
	setRecipeData: React.Dispatch<React.SetStateAction<RecipeType>>
) =>
	fetch(`${NX_MP_API_URI}/recipes?recipeId=${id}`, { method: 'GET' })
		.then((response) => response.json())
		.then((jsonData: RecipeListType) => setRecipeData(jsonData[0]))
		.catch((e) => console.error(e));

export const getRecipes = async (
	amount: number,
	offset: number,
	setList: React.Dispatch<React.SetStateAction<RecipesType>>
) =>
	fetch(`${NX_MP_API_URI}/recipes?limit=${amount}&selectedRecipe=${offset}`, {
		method: 'GET',
	})
		.then((response) => response.json())
		.then(setList)
		.catch((e) => console.error(e));

export const getRecipesPlan = (): MealplanListType => {
	return new Array(7).fill(recipeDefaults);
};
