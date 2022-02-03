import { useEffect, useState } from 'react';
import './Recipes.scss';
import altIMG from '/public/alt.png';

const { NX_MP_API_URI } = process.env;

interface RecipesType {
	__v: number;
	_id: string;
	categoriesId: Array<string>;
	createdAt: string;
	creatorId: string;
	description: string;
	estimate: Array<string>;
	images: Array<string>;
	ingredients: Array<never>;
	instructions: Array<string>;
	preparation: Array<string>;
	public: boolean;
	rating: Array<number>;
	recipeId: string;
	servings: number;
	sidedishesId: Array<string>;
	title: string;
	updatedAt: string;
}
interface RecipesListType extends Array<RecipesType> {
	[key: number]: RecipesType;
}

interface MealplanType extends RecipesType {
	time: string
}
interface MealplanListType extends Array<MealplanType> {
	[key: number]: MealplanType;
}

const getRecipes = async (amount: number, offset: number, setList: React.Dispatch<React.SetStateAction<RecipesListType>>) =>
	fetch(`${NX_MP_API_URI}/recipes?limit=${amount}&skip=${offset}`, {method: 'GET'})
		.then(response => response.json())
		.then(setList)
		.catch((e)=>console.log(e));

const getRecipe = (id: string, setCrecipe: React.Dispatch<React.SetStateAction<RecipesType>>) =>
	fetch(`${NX_MP_API_URI}/recipes?recipeId=${id}`, {method: 'GET'})
		.then(response => response.json())
		.then((jsonData: RecipesListType) => setCrecipe(jsonData[0]))
		.catch((e)=>console.log(e));


const recipesPlan = (amount: number, offset: number): MealplanListType => {
	return new Array(7).fill({
		__v: 0, _id: "string", categoriesId: [""], createdAt: "", creatorId: "", description: "", estimate: [""], images: [""], ingredients: [], instructions: [""], preparation: [""], public: false, rating: [0], recipeId: "", servings: 0,sidedishesId: [""], title: "", updatedAt: "",
	});
}

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
	recipeId: string,
	At?: string,
	personal: boolean,
}

export function Recipe(props: RecipeProps) {
	const {type, recipeId, At, personal} = {At: null, ...props};
	const [crecipe, setCrecipe] = useState<RecipesType>({
		__v: 0, _id: "string", categoriesId: [""], createdAt: "", creatorId: "", description: "", estimate: [""], images: [""], ingredients: [], instructions: [""], preparation: [""], public: false, rating: [0], recipeId: "", servings: 0,sidedishesId: [""], title: "", updatedAt: "",
	});

	useEffect(()=>{
		getRecipe(recipeId, setCrecipe);
	}, [recipeId]);

	const {categoriesId, images, title, description, rating, estimate} = crecipe;
	let body = null;
	if(recipeId !== "") body = 
	<>
		<div className="rimage shadow">
			{	personal ? <span className={"options"}></span> : null }
			<img src={`data:image/jpeg;base64,${images[0]}`} onError={handleAltImg} alt="" onLoad={handleNextImage}></img>
		</div>
		<h3>{title}</h3>
		<p>{description}</p>
		{ type === 'tall' ?
			<div className="time">
				<span>{At??'00:00'}</span>
			</div>
		:
			<>
				<div className="timebox">
					<div className="time icon"></div>
					<span>{estimate[0]}.</span>
				</div>
				<div className="ratingbox">{rating[0]} votes</div>
				<div>
					<span className="rating icon" style={{width: (rating[0]/rating[1]/5*100)+"%"}}></span>
				</div>
			</>
		}
	</>;

	return (
		<div className={type + ' recipe ' + (recipeId !== categoriesId.join(" ") ? "" : 'empty')} id={recipeId+''} onClick={() => console.log('Clicked recipe')}>
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
	const displayAmount = 10;
	const [list, setList] = useState<RecipesListType>([{
		__v: 0, _id: "string", categoriesId: [""], createdAt: "", creatorId: "", description: "", estimate: [""], images: [""], ingredients: [], instructions: [""], preparation: [""], public: false, rating: [0], recipeId: "", servings: 0,sidedishesId: [""], title: "", updatedAt: "",
	}]);
	
	useEffect(()=>{
		getRecipes(displayAmount, 0, setList);
	}, []);

	if(mealFrom === 'plan')
		return (
			<>
				{recipesPlan(displayAmount, 0).map((recipesitem: MealplanType, index: number) => (
					<Recipe key={index} type={'tall'} recipeId={recipesitem.recipeId} At={recipesitem.time} personal={true} />
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
				{list.map((recipesitem: RecipesType, index: number) => 
					<Recipe key={index} type={'wide'} recipeId={recipesitem.recipeId} personal={mealFrom==='personal'} />
				)}
			</>
		);
}
