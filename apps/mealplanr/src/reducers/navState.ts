// Function definitions - Defining what parameters and the object structure
export const setNavCollapsed = () => {
	return {
		type: 'TOGGLE',
		payload: 0,
	};
};
export const setNavIndex = (index = 0) => {
	return {
		type: 'INDEX_PAGE',
		payload: index,
	};
};
export const setUserPopup = (index = 0) => {
	return {
		type: 'POPUP',
		payload: index,
	};
};

export const setPage = (page = '') => {
	return {
		type: 'PAGE',
		payload: page,
	};
};

// Defining the type of the action in order for the reducer to know the content of the action
type ActionType = ReturnType<
	| typeof setNavCollapsed
	| typeof setNavIndex
	| typeof setUserPopup
	| typeof setPage
>;

interface navStateInterface {
	collapsed: boolean;
	index: number;
	userpopup: number;
	page: string;
}

// Defining the reducer, which contains the functionality for each of the functions defined above
// using action.type to identify the function.
const navStateReduser = (
	state: navStateInterface = {
		collapsed: false,
		index: 0,
		userpopup: 0,
		page: '',
	},
	action: ActionType
) => {
	const newstate: navStateInterface = {
		...state,
	};
	switch (action.type) {
		case 'TOGGLE':
			newstate.collapsed = !state.collapsed;
			return Object.assign({ ...newstate });
		case 'INDEX_PAGE':
			newstate.index = action.payload as number;
			return Object.assign({ ...newstate });
		case 'POPUP':
			newstate.userpopup =
				state.userpopup === action.payload ? 0 : (action.payload as number);
			return Object.assign({ ...newstate });
		case 'PAGE':
			newstate.page = action.payload as string;
			return Object.assign({ ...newstate });

		default:
			return Object.assign({ ...newstate });
	}
};

export default navStateReduser;
