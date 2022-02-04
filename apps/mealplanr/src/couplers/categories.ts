const { NX_MP_API_URI } = process.env;

export const categoryDefaults = {
    __v: 0,
    _id: "",
    type: [""],
    name: "empty",
}

export type categoryType = typeof categoryDefaults;

export interface categoryListType extends Array<categoryType> {
  [key: number]: categoryType;
}

export const getCategory = async (id: string, setCategoryData: React.Dispatch<React.SetStateAction<categoryType>>) => {
  if(id === "") return setCategoryData({...categoryDefaults, name: "empty"});
	console.log(id);
  
  fetch(`${NX_MP_API_URI}/categories/?categoryId=${id}`, {method: 'GET'})
		.then(response => response.json())
		.then(setCategoryData)
		.catch((e)=>console.error(e));
  }
export const getCategories = async (ids: Array<string>, setCategoriesData: React.Dispatch<React.SetStateAction<categoryType>>) =>
  ids.map((id: string, index: number) => getCategory(id, setCategoriesData));