import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducers';
import { checkForUser, createUser, userLogin } from './reducers/session';
import './App.scss';
import Navbar from './components/navbar/Navbar';
import Container from './components/container/Container';
import Mealplan from './components/mealplan/Mealplan';
import RecipeView from './components/recipeView/RecipeView';
import Settings from './components/settings/Settings';
import Popup from './components/popup/Popup';
import Showcase from './components/showcase/Showcase';
import CreateRecipe from './components/createRecipe/CreateRecipe';

const user = {
	id: 9272,
	color: 0,
	email: "test@test.test",
	pass: "123456",
};

function App() {
	// Get relevant values in store
	const navIndex: number = useSelector((state: RootState) => state.navState.index);
	const userPopup = useSelector((state: RootState) => state.navState.userpopup);
	const navCollapsed = useSelector((state: RootState) => state.navState.collapsed);
	const isLoggedIn: boolean = useSelector((state: RootState) => state.session.isLoggedIn);
	const theme = useSelector((state: RootState) => state.theme);
	const dispatch = useDispatch();

	((hue: number) => document.documentElement.style.setProperty('--c', String(hue)))(theme.hue);

	// Event handlers to change the global object, then use that value in store on a submit
	const updateDataEmail = (e: React.ChangeEvent<HTMLInputElement>) => { user.email = e.target.value };
	const updateDataPass = (e: React.ChangeEvent<HTMLInputElement>) => { user.pass = e.target.value };

	return (
		<div id="app">
			{ userPopup !== 0 ?
				<Popup type={"userpopup"} navCollapsed={navCollapsed} dispatch={dispatch}>
					{ userPopup === 1 ? <>
						<h1>Login/Signup</h1>
						<p>Enter email, if its is not in our system, you will be redirected to signup.</p>
						<input type={"email"} placeholder={"test@test.test"} id={"userCheckEmail"} onChange={updateDataEmail} />
						<div onClick={() => dispatch(checkForUser(user.email))}>Check email</div>
					</> : userPopup === 2 ? <>
						<h1>Login</h1>
						<p>Mail known, enter password</p>
						<input type={"password"} placeholder={"123456"} onChange={updateDataPass} value={""} />
						<div onClick={() => dispatch(userLogin(user.email, user.pass))}>Login</div>
					</> : userPopup === 3 ? <>
						<h1>Signup</h1>
						<p>Email not known, enter verification code from mail</p>
						<input type={"text"} placeholder="222444" value={""} />
						<div onClick={() => {dispatch(createUser(user.email, user.pass, user.pass))}}>Login</div>
					</> : null }
				</Popup>
			: null }
			<Navbar />
			{!isLoggedIn /* ---- Page-select for not-yet-logged-in-users ---- */
				? {
						/* React friendly switch-statement */
						0: (
							<Container>
								<h1>What is MealPlanr</h1>
								<p></p>
							</Container>
						),
						1: (
							<Container>
								<h1>Browse recipes</h1>
								<p></p>
							</Container>
						),
						2: (
							<Container>
								<h1>Create a collection</h1>
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Sapiente modi possimus
									nobis nisi nulla voluptates numquam ea
									provident aliquid, enim natus iusto ipsam
									illum ipsum temporibus fuga, quidem, error
									ipsa. Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Sapiente modi possimus
									nobis nisi nulla voluptates numquam ea
									provident aliquid, enim natus iusto ipsam
									illum ipsum temporibus fuga, quidem, error
									ipsa. Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Sapiente modi possimus
									nobis nisi nulla voluptates numquam ea
									provident aliquid, enim natus iusto ipsam
									illum ipsum temporibus fuga, quidem, error
									ipsa. Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Sapiente modi possimus
									nobis nisi nulla voluptates numquam ea
									provident aliquid, enim natus iusto ipsam
									illum ipsum temporibus fuga, quidem, error
									ipsa.
								</p>
							</Container>
						),
				  }[
						navIndex
				  ] /* In case of no result matching (default to): */ || (
						<Container>
							<h1>404 Error</h1>
							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Sapiente modi possimus nobis
								nisi nulla voluptates numquam ea provident
								aliquid, enim natus iusto ipsam illum ipsum
								temporibus fuga, quidem, error ipsa. Lorem ipsum
								dolor sit amet consectetur adipisicing elit.
								Sapiente modi possimus nobis nisi nulla
								voluptates numquam ea provident aliquid, enim
								natus iusto ipsam illum ipsum temporibus fuga,
								quidem, error ipsa. Lorem ipsum dolor sit amet
								consectetur adipisicing elit. Sapiente modi
								possimus nobis nisi nulla voluptates numquam ea
								provident aliquid, enim natus iusto ipsam illum
								ipsum temporibus fuga, quidem, error ipsa. Lorem
								ipsum dolor sit amet consectetur adipisicing
								elit. Sapiente modi possimus nobis nisi nulla
								voluptates numquam ea provident aliquid, enim
								natus iusto ipsam illum ipsum temporibus fuga,
								quidem, error ipsa.
							</p>
						</Container>
				  )
				: {
						/* ---- Page-select for users ---- */
						0: <Mealplan />,
						1: <RecipeView />,
						2: <RecipeView personal />,
						3: <CreateRecipe />,
						5: <Showcase />,
						4: <Settings />,
				  }[
						navIndex
				  ] /* In case of no result matching (default to): */ || (
						<Container>
							<h1>404 Error</h1>
							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Sapiente modi possimus nobis
								nisi nulla voluptates numquam ea provident
								aliquid, enim natus iusto ipsam illum ipsum
								temporibus fuga, quidem, error ipsa. Lorem ipsum
								dolor sit amet consectetur adipisicing elit.
								Sapiente modi possimus nobis nisi nulla
								voluptates numquam ea provident aliquid, enim
								natus iusto ipsam illum ipsum temporibus fuga,
								quidem, error ipsa. Lorem ipsum dolor sit amet
								consectetur adipisicing elit. Sapiente modi
								possimus nobis nisi nulla voluptates numquam ea
								provident aliquid, enim natus iusto ipsam illum
								ipsum temporibus fuga, quidem, error ipsa. Lorem
								ipsum dolor sit amet consectetur adipisicing
								elit. Sapiente modi possimus nobis nisi nulla
								voluptates numquam ea provident aliquid, enim
								natus iusto ipsam illum ipsum temporibus fuga,
								quidem, error ipsa.
							</p>
						</Container>
				  )}
		</div>
	);
}

export default App;
