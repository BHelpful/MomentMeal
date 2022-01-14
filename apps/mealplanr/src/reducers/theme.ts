import { get } from 'lodash';

const { NX_MP_API_URI } = process.env;
const THEME = 'THEME';

// Function definitions - Defining what parameters and the object structure
const theme = (hue: number, shade: number) => {
	return {
		type: THEME,
		payload: {
			hue: hue,
			shade: shade,
		},
	};
};

// Defining the type of the action in order for the reducer to know the content of the action
type ActionType = ReturnType<typeof theme>;

interface themeType {
	hue: number;
	shade: number;
}

// Defining the reducer, which contains the functionality for each of the functions defined above
// using action.type to identify the function.
const themeReducer = (
	state: themeType = {
		hue: 0,
		shade: 0,
	},
	action: ActionType
) => {
	const newstate: any = {};
	switch (action.type) {
		case THEME:
			newstate.hue = get(action.payload, 'hue');
			newstate.shade = get(action.payload, 'shade');
			return Object.assign({ ...state, ...newstate });

		default:
			return Object.assign({ ...state, ...newstate });
	}
};

export const getTheme = () => {
	return async function (dispatch: (state: ActionType)=>void, getState: ()=>any) {
		const email = getState().session.user.email;
		const { refresh, authorization } = getState().session;
		const themeResponse = await fetch(
			`${NX_MP_API_URI}/users/?userMail=${email}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'x-refresh': refresh,
					authorization: authorization,
				},
				method: 'GET',
			}
		);

		if (themeResponse.status === 200) {
			const themedata = await themeResponse.json();
			const [hue, shade] = themedata.options.theme.split(', ');
			dispatch(theme(hue, shade));
		} else {
			// Error handling
		}
	};
};

export const setTheme = (password: string, thue: number, tshade: number) => {
	return async function (dispatch: (state: ActionType)=>void, getState: ()=>any) {
		const email = getState().session.user.email;
		const { refresh, authorization } = getState().session;
		const themeResponse: Response = await fetch(
			`${NX_MP_API_URI}/users/?userMail=${email}`,
			{
				body: JSON.stringify({
					password: password,
					options: {
						theme: `${thue}, ${tshade}`,
					},
				}),
				headers: {
					'Content-Type': 'application/json',
					'x-refresh': refresh,
					authorization: authorization,
				},
				method: 'PUT',
			}
		);

		if (themeResponse.status === 200) {
			const themedata = await themeResponse.json();
			const [hue, shade] = themedata.options.theme.split(', ');
			dispatch(theme(hue, shade));
		} else {
			// Error handling
		}
	};
};

export default themeReducer;
