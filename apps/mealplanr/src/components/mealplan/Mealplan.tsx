import Container from '../container/Container';
import './Mealplan.scss';
import '../recipes/Recipes.scss';
import SelectionArea, {
	Search,
	WeekdaysButtons,
	WeekdaysDropdown,
} from '../selectionArea/SelectionArea';
import Recipes from '../recipes/Recipes';

/* GET THIS DATA FROM API */
const foodSuggestions = [ 'Carrot', 'Chicken', 'Milk', 'Gauda', 'Salmon', 'Egg', 'Pineapple', 'Bacon' ];
const storesSuggestions = [ 'Rema1000', 'Fakta', 'Bilka', 'Meny', 'Netto', 'SuperBrugsen', 'Liva' ];
const categorySuggestions = [ 'Spice', 'Asian', 'Indian', 'American', 'Traditional', 'Nordic' ];
/* END OF GET DATA FROM API */

var menustate = 0
const toggleCreateMenu = (evt: any) => {
	menustate++;
	menustate %= 2;
	if(menustate) {
		evt.target.innerHTML = "Cancel";
		evt.target.nextSibling.classList.add("open");
	} else {
		evt.target.innerHTML = "Create";
		evt.target.nextSibling.classList.remove("open");
	}
}

// Creates the container for viewing and planning the weekly mealplan
export default function Mealplan() {
	return (
		<Container id="mealplan">
			<h1>My meal plan</h1>
			<div className="button" onClick={toggleCreateMenu}>Create</div>
			<SelectionArea columns={2} cln={"hidden"}>
				<div>
					<WeekdaysButtons
						decription={'Select which days to plan meals for'}
						offset={2}
						namelength={2}
						uppercase={true}
						/>
					<WeekdaysDropdown
						decription={'What meals do you want for each day'}
						offset={2}
						namelength={3}
						uppercase={false}
						/>
				</div>
				<div>
					<Search taglist
						type='search'
						decription={'Stockpiled ingredients'}
						datalist={foodSuggestions} />
					<Search taglist
						type='search'
						decription={'Pefered stores'}
						datalist={storesSuggestions} />
					<Search taglist
						type='search'
						decription={'Include/Exclude categories'}
						toggleable={true}
						datalist={categorySuggestions} />
				</div>
				<div>
					<div className={"big button"}>Create mealplan</div>
				</div>
			</SelectionArea>
			<div className="plans">
				<div className="scrollFiller"></div>
					<Recipes mealFrom='plan'/>
				<div className="scrollFiller"></div>
			</div>
		</Container>
	);
}
