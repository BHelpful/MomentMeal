const { NX_MP_API_URI } = process.env;

export const categoryDefaults = {
    __v: 0,
    _id: "",
    type: [""],
    name: "empty",
}

export type CategoryType = typeof categoryDefaults;

export interface CategoryListType extends Array<CategoryType> {
  [key: number]: CategoryType;
}

export const getCategory = async (id: string, setCategoryData: React.Dispatch<React.SetStateAction<CategoryType>>) => {
  if(id === "") return setCategoryData({...categoryDefaults, name: "empty"});
	console.log(id);
  
  fetch(`${NX_MP_API_URI}/categories/?categoryId=${id}`, {method: 'GET'})
		.then(response => response.json())
		.then(setCategoryData)
		.catch((e)=>console.error(e));
  }
export const getCategories = async (ids: Array<string>, setCategoriesData: React.Dispatch<React.SetStateAction<CategoryType>>) =>
  ids.map((id: string, index: number) => getCategory(id, setCategoriesData));