import Container from '../components/container/Container';
import CreateRecipe from '../components/createRecipe/CreateRecipe';
import Mealplan from '../components/mealplan/Mealplan';
import RecipeView from '../components/recipeView/RecipeView';
import Settings from '../components/settings/Settings';
import Showcase from '../components/showcase/Showcase';

export enum pages {
	CREATE_RECIPE = 'CREATE_RECIPE',
	MEAL_PLAN = 'MEAL_PLAN',
	RECIPE_VIEW = 'RECIPE_VIEW',
	RECIPE_VIEW_PERSONAL = 'RECIPE_VIEW_PERSONAL',
	SHOWCASE = 'SHOWCASE',
	SETTINGS = 'SETTINGS',
	PAGE_NOT_FOUND = '404',
}
interface PageContentType {
	[index: string]: JSX.Element;
}
export const pageContent: PageContentType = {};
pageContent[pages.CREATE_RECIPE] = <CreateRecipe></CreateRecipe>;
pageContent[pages.MEAL_PLAN] = <Mealplan></Mealplan>;
pageContent[pages.RECIPE_VIEW] = <RecipeView></RecipeView>;
pageContent[pages.RECIPE_VIEW_PERSONAL] = <RecipeView personal></RecipeView>;
pageContent[pages.SHOWCASE] = <Showcase></Showcase>;
pageContent[pages.SETTINGS] = <Settings></Settings>;
pageContent[pages.PAGE_NOT_FOUND] = (
	<Container>
		<h1>404 Error</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi
			possimus nobis nisi nulla voluptates numquam ea provident aliquid, enim
			natus iusto ipsam illum ipsum temporibus fuga, quidem, error ipsa. Lorem
			ipsum dolor sit amet consectetur adipisicing elit. Sapiente modi possimus
			nobis nisi nulla voluptates numquam ea provident aliquid, enim natus iusto
			ipsam illum ipsum temporibus fuga, quidem, error ipsa. Lorem ipsum dolor
			sit amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi
			nulla voluptates numquam ea provident aliquid, enim natus iusto ipsam
			illum ipsum temporibus fuga, quidem, error ipsa. Lorem ipsum dolor sit
			amet consectetur adipisicing elit. Sapiente modi possimus nobis nisi nulla
			voluptates numquam ea provident aliquid, enim natus iusto ipsam illum
			ipsum temporibus fuga, quidem, error ipsa.
		</p>
	</Container>
);
