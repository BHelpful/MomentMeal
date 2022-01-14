// Function definitions - Defining what parameters and the object structure
export const increment = (nr = 0) => {
	return {
		type: 'INCREMENT',
		payload: nr,
	};
};
export const decrement = (nr = 0) => {
	return {
		type: 'DECREMENT',
		payload: nr,
	};
};

// Defining the type of the action in order for the reducer to know the content of the action
type ActionType = ReturnType<typeof increment | typeof decrement>;

// Defining the reducer, which contains the functionality for each of the functions defined above
// using action.type to identify the function.
const counterReducer = (state = 0, action: ActionType) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
};

export default counterReducer;
