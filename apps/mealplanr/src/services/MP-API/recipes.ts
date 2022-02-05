const { NX_MP_API_URI } = process.env;

export const recipeDefaults = {
  __v: 0,
  _id: "a",
  categoriesId: [],
  createdAt: "",
  creatorId: "",
  description: "",
  estimate: [""],
  images: [""],
  ingredients: [],
  instructions: [""], 
  preparation: [""],
  public: false,
  rating: [0, 0],
  recipeId: "",
  servings: 4,
  sidedishesId: [""],
  title: "",
  updatedAt: "",
}

export type RecipesType = typeof recipeDefaults;

export interface RecipesListType extends Array<RecipesType> {
	[key: number]: RecipesType;
}

export interface MealplanType extends RecipesType {
	time: string
}

export interface MealplanListType extends Array<MealplanType> {
	[key: number]: MealplanType;
}

export const getRecipe = (id: string, setRecipeData: React.Dispatch<React.SetStateAction<RecipesType>>) =>
  fetch(`${NX_MP_API_URI}/recipes?recipeId=${id}`, {method: 'GET'})
    .then(response => response.json())
    .then((jsonData: RecipesListType) => setRecipeData(jsonData[0]))
    .catch((e)=>console.error(e));

export const getRecipes = async (amount: number, offset: number, setList: React.Dispatch<React.SetStateAction<RecipesListType>>) =>
	fetch(`${NX_MP_API_URI}/recipes?limit=${amount}&skip=${offset}`, {method: 'GET'})
		.then(response => response.json())
		.then(setList)
		.catch((e)=>console.error(e));

export const getRecipesPlan = (): MealplanListType => {
	return new Array(7).fill(recipeDefaults);
}