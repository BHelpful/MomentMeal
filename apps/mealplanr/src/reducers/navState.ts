// Function definitions - Defining what parameters and the object structure
export const setNavCollapsed = () => {
	return {
		type: 'TOGGLE',
		payload: 0,
	};
};
export const setNavIndex = (index = 0) => {
	return {
		type: 'PAGE',
		payload: index,
	};
};
export const setUserPopup = (index = 0) => {
	return {
		type: 'POPUP',
		payload: index,
	}
};

// Defining the type of the action in order for the reducer to know the content of the action
type ActionType = ReturnType<typeof setNavCollapsed | typeof setNavIndex | typeof setUserPopup>;

interface navStateInterface {
	collapsed: boolean;
	index: number;
	userpopup: number;
}

// Defining the reducer, which contains the functionality for each of the functions defined above
// using action.type to identify the function.
const navStateReduser = (
	state: navStateInterface = { collapsed: false, index: 0, userpopup: 0 },
	action: ActionType
) => {
	const newstate: navStateInterface = { collapsed: false, index: 0, userpopup: 0 };
	switch (action.type) {
		case 'TOGGLE':
			newstate.collapsed = !state.collapsed;
			return Object.assign({...state, ...newstate});
		case 'PAGE':
			newstate.index = action.payload;
			return Object.assign({...state, ...newstate});
		case 'POPUP':
			newstate.userpopup = state.userpopup === action.payload ? 0 : action.payload
			return Object.assign({...state, ...newstate});
		default:
			return Object.assign({...state, ...newstate});
	}
};

export default navStateReduser;
