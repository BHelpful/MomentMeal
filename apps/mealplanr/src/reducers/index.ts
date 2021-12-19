import { combineReducers } from 'redux';
import counterReducer from './counter';
import sessionReducer from './session';
import navStateReducer from './navState';
import themeReducer from './theme';

export const rootReducer = combineReducers({
	counter: counterReducer,
	session: sessionReducer,
	navState: navStateReducer,
	theme: themeReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
