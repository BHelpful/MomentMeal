import { useEffect, useState } from 'react';
import { CategoryType } from '../../services/MP-API/categories';
import {
	getRecipe,
	getRecipes,
	getRecipesPlan,
	MealplanType,
	recipeDefaults,
	RecipesType,
} from '../../services/MP-API/recipes';
import { useDispatch } from 'react-redux';
import { setPage } from '../../reducers/navState';
import { pages } from '../../utils/pages';
import './Recipes.scss';
import altIMG from '/public/alt.png';

// Handle to set placholder image when src is unavailable
function handleAltImg(e: React.SyntheticEvent<HTMLImageElement, Event>) {
	const target = e.target as HTMLImageElement;
	const pTarget = target.parentElement as HTMLDivElement;
	target.src = altIMG;
	pTarget.classList.remove('shadow'); // Shadow is applied to the path of svg - we do not want that
}

// create DataSetCycleImg interface to include images in the html elements dataset list
interface DataSetCycleImg extends HTMLImageElement {
	dataset: {
		images: string;
	};
}

// Cycle images
function handleNextImage(e: React.SyntheticEvent<HTMLImageElement, Event>) {
	const target = e.target as DataSetCycleImg;
	const pTarget = target.parentElement as HTMLDivElement;
	if (!pTarget.classList.contains('shadow')) return; // If no shadow, placeholder is used - no images at all
	const max = Number(target.dataset.images); // Data-tag containing amount of images assoatiated
	const [id, current] = target.src
		.replace(/http:\/\/localhost:3000\/temp\/recipe_(\d+)_(\d+).jpg/, '$1,$2')
		.split(','); // get current values
	const next = (Number(current) + 1) % max; // Add one and loop in case of overflow
	setTimeout(() => {
		target.src = `/temp/recipe_${id}_${next}.jpg`;
	}, 5000); // Wait 5s. Changing src will call onload causing chain reaction to trigger function again
}

interface RecipeProps {
	type: 'wide' | 'tall';
	recipeId: string;
	At?: string;
	personal: boolean;
}

export function Recipe(props: RecipeProps) {
	const dispatch = useDispatch();
	const { type, recipeId, At, personal } = { At: null, ...props };

	const [recipeData, setRecipeData] = useState(recipeDefaults);
	useEffect(() => {
		getRecipe(recipeId, setRecipeData);
	}, [recipeId]);

	const { categoriesId, images, title, description, rating, estimate } =
		recipeData ?? recipeDefaults;

	const categoriesData: Array<string> = [];
	categoriesId.forEach(
		(category: CategoryType, index: number) =>
			(categoriesData[index] = category.name.toLowerCase())
	);

	let body: JSX.Element | null = null;
	if (recipeId !== '' && recipeData !== recipeDefaults)
		body = (
			<>
				<div className="rimage shadow">
					{personal ? <span className={'options'}></span> : null}
					<img
						src={`data:image/jpeg;base64,${images[0]}`}
						onError={handleAltImg}
						alt=""
						onLoad={handleNextImage}
					/>
				</div>
				<h3>{title}</h3>
				<p>{description}</p>
				{type === 'tall' ? (
					<div className="time">
						<span>{At ?? '00:00'}</span>
					</div>
				) : (
					<>
						<div className="timebox">
							<div className="time icon"></div>
							<span>{estimate[0]}.</span>
						</div>
						<div className="ratingbox">{rating[0]} votes</div>
						<div>
							<span
								className="rating icon"
								style={{ width: `${(rating[0] / rating[1] / 5) * 100}%` }}
							/>
						</div>
					</>
				)}
			</>
		);

	return (
		<div
			className={`${type} recipe ${
				categoriesData.length > 0 ? categoriesData.join(' ') : 'empty'
			}`}
			id={recipeId}
			onClick={() => (body ? dispatch(setPage(pages.SHOWCASE)) : null)} // Add dispatch to open recipe select popover in stead of null
		>
			{body ?? (
				<>
					<h3>Add recipe</h3>
					<p>+</p>
				</>
			)}
		</div>
	);
}

interface RecipesProps {
	showAddOwn?: 'true' | 'false';
	mealFrom: 'personal' | 'plan' | 'public';
}

export default function Recipes(props: RecipesProps) {
	const dispatch = useDispatch();
	const showAddOwn = props.showAddOwn === 'true' || false;
	const { mealFrom } = props;
	const displayAmount = 10;

	const [listData, setListData] = useState([recipeDefaults]);
	useEffect(() => {
		getRecipes(displayAmount, 0, setListData);
	}, []);

	if (mealFrom === 'plan')
		return (
			<>
				{getRecipesPlan().map((recipesItem: MealplanType, index: number) => (
					<Recipe
						key={index}
						type={'tall'}
						recipeId={recipesItem.recipeId}
						At={recipesItem.time}
						personal={true}
					/>
				))}
			</>
		);
	else
		return (
			<>
				{showAddOwn ? (
					<div
						className="empty"
						onClick={() => dispatch(setPage(pages.CREATE_RECIPE))}
					>
						<h3>Add your own</h3>
						<p>+</p>
					</div>
				) : (
					''
				)}
				{listData.map((recipesItem: RecipesType, index: number) => (
					<Recipe
						key={index}
						type={'wide'}
						recipeId={recipesItem.recipeId}
						personal={mealFrom === 'personal'}
					/>
				))}
			</>
		);
}
