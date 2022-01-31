import './Recipes.scss';
import altIMG from '/public/alt.png';

/* GET DATA FROM API */
interface RecipesType {
	recipeId: number;
	time?: string;
}
interface RecipesListType extends Array<RecipesType> {
	[key: number]: RecipesType;
}

interface MealplanType extends Array<RecipesType> {
	[key: number]: RecipesType;
}

const mealPlan: MealplanType = [
	{ recipeId: -			 1, time: ''	},
	{ recipeId:   252816, time: '18:00' },
	{ recipeId:  3500346, time: '16:45' },
	{ recipeId: -			 1, time: '' },
	{ recipeId: -			 1, time: '' },
	{ recipeId: -			 1, time: '' },
	{ recipeId: -			 1, time: '' },
];

const recipes: RecipesListType = [
	{ recipeId: 2102013 },
	{ recipeId: 2340076 },
	{ recipeId: 2500023 },
	{ recipeId: 3500346 }
];

const myRecipes: RecipesListType = [
	{ recipeId: 3500346, }
];
/*END OF GET DATA FROM API*/

/*FUNCTION SHOULD FETCH FROM DATABASE INSTEAD*/
// Function to get the recipe information from the id
const recipeInfo = (id: number) => {
	switch (id) {
		case 252816: return {
			Title: 'Pyttipanna',
			Decs: 'Pytt i panna, also pytt i panne, pytt i panne, pyttipannu, is a culinary dish consisting of chopped meat, potatoes, and onions fried, similar to a hash',
			Images: 0,
			Time: { value: 15, unit: 'min' },
			Ratings: 233,
			Rating: 700,
			category: 'meat',
		};
		case 3500346: return {
			Title: 'Tomatobeef',
			Decs: 'Greek originated totato-based beef.',
			Images: 2,
			Time: { value: 2, unit: 'hr' },
			Ratings: 1,
			Rating: 5,
			category: 'vegan',
		};
		case 2340076: return {
			Title: 'Appel pie',
			Decs: 'This is a sweet, tart and delicious apple pie. Guaranteed to please. Be sure to use Granny Smith apples since they work the best.',
			Images: 0,
			Time: { value: 1, unit: 'hr' },
			Ratings: 997,
			Rating: 3267,
			category: 'diray',
		}
		case 2500023: return {
			Title: 'Watermelon salad',
			Decs: 'Salad form the troppes.',
			Images: 0,
			Time: { value: 10, unit: 'min' },
			Ratings: 769,
			Rating: 900,
			category: 'salad',
		}
		default: return {
			Title: 'Placeholder',
			Decs: 'Decsripe the recipe',
			Images: 0,
			Time: {value: -1, unit: 'min'},
			Rating: 0,
			Ratings: 0,
			category: 'meat',
		};
	}
};

// Handle to set placholder image when src is unavailable
function handleAltImg(e: React.SyntheticEvent<HTMLImageElement, Event>) {
	const target = e.target as HTMLImageElement;
	const ptarget = target.parentElement as HTMLDivElement;
	target.src = altIMG;
	ptarget.classList.remove("shadow"); // Shadow is applied to the path of svg - we do not want that
}

// create Datasetcycleimg interface to include images in the html elements dataset list
interface Datasetcycleimg extends HTMLImageElement {
	dataset: {
		images: string;
	};
}

// Cycle images
function handleNextImage(e: React.SyntheticEvent<HTMLImageElement, Event>) {
	const target = e.target as Datasetcycleimg;
	const ptarget = target.parentElement as HTMLDivElement;
	if(!ptarget.classList.contains("shadow")) return; // If no shadow, placeholder is used - no images at all
	const max = Number(target.dataset.images); // Data-tag containing amount of images assoatiated
	const [id, current] = target.src.replace(/http:\/\/localhost:3000\/temp\/recipe_(\d+)_(\d+).jpg/,"$1,$2").split(","); // get current values
	const next = (Number(current) + 1) % max; // Add one and loop in case of overflow
	setTimeout(() => {target.src = "/temp/recipe_"+id+"_"+next+".jpg"}, 5000); // Wait 5s. Changing src will call onload causing chain reaction to trigger function again
};

interface RecipeProps {
	type: 'wide'|'tall',
	Id: number,
	At?: string,
	personal: boolean,
}

export function Recipe(props: RecipeProps) {
	const {type, Id, At, personal} = {At: null, ...props};
	const {Images, Title, Decs, Time, Rating, Ratings, category} = recipeInfo(Id);

	let body = null;
	if(Id !== -1) body =
		<>
			<div className="rimage shadow">
				{	personal ? <span className={"options"}></span> : null }
				<img src={"/temp/recipe_"+Id+"_0.jpg"} data-images={Images} onError={handleAltImg} alt="" onLoad={handleNextImage}></img>
			</div>
			<h3>{Title}</h3>
			<p>{Decs}</p>
			{ type === 'tall' ?
				<div className="time">
					<span>{At??'00:00'}</span>
				</div>
			:
				<>
					<div className="timebox">
						<div className="time icon"></div>
						<span>{Time.value + ' ' + Time.unit}.</span>
					</div>
					<div className="ratingbox">{Ratings} votes</div>
					<div>
						<span className="rating icon" style={{width: (Rating/Ratings/5*100)+"%"}}></span>
					</div>
				</>
			}
		</>;

	return (
		<div className={type + ' recipe ' + (Id !== -1 ? category : 'empty')} id={Id+''} onClick={() => console.log('Clicked recipe')}>
			{ body ??
				<>
					<h3>Add recipe</h3>
					<p>+</p>
				</>
			}
		</div>
	);
}

interface RecipesProps {
	showAddOwn?: 'true' | 'false';
	mealFrom: 'personal'|'plan'|'public';
}

export default function Recipes(props: RecipesProps) {
	const showAddOwn = props.showAddOwn === 'true' || false;
	const {mealFrom} = props;
	const data = mealFrom === 'personal' ? myRecipes :
								mealFrom === 'plan' ? mealPlan :
									recipes;

	if(mealFrom === 'plan')
		return (
			<>
				{data.map((recipesitem: RecipesType, index: number) => (
					<Recipe key={index} type={'tall'} Id={recipesitem.recipeId} At={recipesitem.time} personal={true} />
				))}
			</>
		);
	
	else
		return (
			<>
				{showAddOwn ? (
					<div className="empty">
						<h3>Add your own</h3>
						<p>+</p>
					</div>
				) : ''}
				{data.map((recipesitem: RecipesType, index: number) => (
					<Recipe key={index} type={'wide'} Id={recipesitem.recipeId} personal={mealFrom==='personal'} />
				))}
			</>
		);
	
}
