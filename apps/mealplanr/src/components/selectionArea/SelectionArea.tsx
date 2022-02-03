import React, { Component, KeyboardEventHandler, MouseEventHandler, useState } from 'react';
import './SelectionArea.scss';

interface QuantityPorps {
	time?: boolean;
	ingredient?: boolean;
}

// Creates a element for user to enter quantities
export function Quantaty(props: QuantityPorps) {
	const {time, ingredient} = props;
	if(time) return (
		<div className={"quantity time"}>
			<p><span>60</span></p>
			<p><span>min</span></p>
	</div>
	); else if (ingredient) return (
		<>
			<div className={"quantity ingredient"}>
				<input type="text" placeholder={"Carrot"}/>
				<input type="number" value={10}/>
				<select>
					<option value="g">Grams</option>
					<option value="L">Liters</option>
				</select>
			</div>
			<div className={"button"}>Add</div>
		</>
	); else return (
		<div className={"quantity amount"}>
			<p>-</p>
			<p><span>2</span> portions</p>
			<p>+</p>
		</div>
	);
}

/* DRAG AND DROP HANDLES FOR Item */
let dragSrcEl: HTMLDivElement;
const handleDragStart = (evt: React.DragEvent<HTMLDivElement>) => {
	dragSrcEl = evt.target as HTMLDivElement;
  dragSrcEl.style.opacity = '0.4';
  evt.dataTransfer.effectAllowed = 'move';
  evt.dataTransfer.setData('text/html', dragSrcEl.innerHTML);
};
const handleDragEnter = (evt: React.DragEvent<HTMLDivElement>) => (evt.target as HTMLDivElement).classList.add('over');
const handleDragLeave = (evt: React.DragEvent<HTMLDivElement>) => {
  evt.stopPropagation();
  (evt.target as HTMLDivElement).classList.remove('over');
};
const handleDragOver = (evt: React.DragEvent<HTMLDivElement>) => {
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'move';
  return false;
};
const handleDragDrop = (evt: React.DragEvent<HTMLDivElement>) => {
  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = (evt.target as HTMLDivElement).innerHTML;
    (evt.target as HTMLDivElement).innerHTML = evt.dataTransfer.getData('text/html');
  }
  return false;
}
const handleDragEnd = (evt: React.DragEvent<HTMLDivElement>) => {
  const listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, (item: HTMLDivElement) => item.classList.remove('over'));
  (evt.target as HTMLDivElement).style.opacity = '1';
}
/* END OF DRAG AND DROP HANDLES FOR Item */

interface ListingProps {
	name: string;
	drag?: boolean;
}

// Creates a list wrapper for Item
class Listing extends Component<ListingProps> {
	override render () {
		const {name, drag, children} = this.props;
		if (drag) return (
			<>
				<p>{name}</p>
				<input type="text" placeholder={"Clean/wash beans"}></input>
				<div className={"button"}>Add</div>
				<div className={"listing drag"}>{children}</div>
			</>
		);
		else return (
			<>
				<p>{name}</p>
				<div className={"listing"}>{children}</div>
			</>
		);
	}
}

interface ItemProps {
	name: string;
	amount?: number;
	unit?: "kg"|"g"|"mg"|"L"|"dL"|"cL"|"mL"|"tbsp"|"tsp"|"dsp"|"pcs"|"tin"|"bag"|"sm"|"med"|"lrg"|""|"°C";
	drag?: boolean;
}

// Creates an list element with checkbox or draggable
export function Item(props: ItemProps) {
	const {name, amount, unit, drag} = {amount: "", unit: "", ...props};
	
	if (drag) return (
		<div className={"item drag"} draggable={true}
			onDragEnter={handleDragEnter}
			onDragOver=	{handleDragOver}
			onDragLeave={handleDragLeave}
			onDragStart={handleDragStart}
			onDrop=			{handleDragDrop}
			onDragEnd=	{handleDragEnd}>
			<div className={"drag icon"}></div>
			<p><span>{name}</span></p>
			<p>{amount?<span>{amount}</span>:<span></span>}<span> {unit}</span></p>
			<div className={"cross icon"}></div>
		</div>
	);
	else return (
		<label className={"item cc"}>
			<input type="checkbox" />
			<span className="mark"></span>
			<p>{name}</p>
			<p><span>{amount}</span><span>{unit}</span></p>
		</label>
	);
}

// Function to handle click on remove icon on tag
const handleTagRemove = (evt: React.MouseEvent<HTMLDivElement>) => {
	((evt.target as HTMLDivElement).parentElement as HTMLDivElement).remove();
}
// Function to handle click on tag text
const toggleTag = (evt: React.MouseEvent<HTMLDivElement>) => {
	const elem = evt.target as HTMLDivElement;
	const old = elem.classList[0] || "include";
	elem.classList.remove(old);
	elem.classList.add(old==="include" ? "exclude" : "include");
	elem.title = `${toFirstUpperCase(old)} item by clicking`;
}

interface TagProps {
	type: string,
	name: string,
	toggleable?: boolean,
	nonremovable?: boolean
}

const noOnclick: MouseEventHandler<HTMLParagraphElement|HTMLLabelElement> = () => undefined;
const noOnkey: KeyboardEventHandler<HTMLInputElement> = () => undefined;

// Function to create a tag
export function Tag(props: TagProps) {
	const { type, name, toggleable, nonremovable } = props;
	return <div className={'tag ' + type}>
					<p onClick={toggleable?toggleTag:noOnclick}>{name}</p>
					<span className={nonremovable?'':'removal'} onClick={nonremovable?noOnclick:handleTagRemove}></span>
				</div>;
}

// Handle to toggle dropdown state
const toggleDropdown = (toggle = true) => (evt: React.MouseEvent<HTMLDivElement>|React.FocusEvent<HTMLDivElement>) => {
	evt.preventDefault();
	const target = evt.target as HTMLDivElement;
	if(!toggle || target.classList.contains('open')) {
		target.classList.remove('open');
	} else {
		target.classList.add('open');
	}
}

// Manipulate ONLY the first letter to be uppercase
const toFirstUpperCase = (v: string) => v.replace(/(\w)(.*)/, (...args: string[]) => args[1].toUpperCase()+args[2]);

/* GET DATA FROM API */
const lookupType = (name: string) => {
	switch(name.toLowerCase()) {
		case 'chicken': return 'meat';
		default: return 'unkown';
	}
}
/* ENDOF GET DATA FROM API */

interface KeyboardEventWithData extends KeyboardEvent {
	data?: HTMLElement;
}interface KeyboardEventWithDataReact<T> extends React.KeyboardEvent<T> {
	data?: HTMLElement;

	locale: string;
	nativeEvent: KeyboardEvent;
	isDefaultPrevented: () => boolean;
	isPropagationStopped: () => boolean;
	persist: () => void;
}

interface Variabel extends Object {
	neededtotrickts?: null;
}
// Get the name of a variable name as a string
const varToString = (varObj: Variabel) => (Object.keys(varObj)[0]).toString();

// Unused <- undefined
const handleSubmit = (evt: React.FormEvent) => 0;

// Handle to execute on keypress on a searchbar
const handleKeyDown = (createTag: createTagType, tags: {name: string, type: string}[]) => (evt: KeyboardEventWithDataReact<HTMLDivElement>) => {
	// Checks for enter or a comma
	if(evt.key === 'Enter' || evt.key === ",") {
		const target = (evt.target||evt.data) as HTMLInputElement;
		evt.preventDefault();
		const elem = (target.parentElement as HTMLDivElement).nextElementSibling as HTMLDivElement;
		const newTaglist = tags;
		if(elem.classList.contains('tags')) {
			const val = target.value;
			// Add new tag if matches requirements
			if(val.match(/(\w{2,} ?)+/)) newTaglist.push({"name": toFirstUpperCase(val), "type": lookupType(val)});
			// Empty tag list
			target.value = '';
			// Fill populate list with updatede values
			createTag(
				newTaglist.filter(
					(v: TagType, i: number, a: TagType[]) => a.findIndex(
						(t: TagType) => (t.name === v.name)
					) === i
				)
			);
		}
	}
};

// Yeild function to generate id's with format: AA, BA, CA, ...
function* HTMLIDgenerator(): Generator<string> {
	let n = Math.ceil(Math.random() * 63);
	while (++n) yield (String.fromCharCode((n % 26) + 64) + String.fromCharCode(Math.floor(n / 26) + 64));
}

const htmlID = HTMLIDgenerator(); // Create generator from yield function
const getHTMLID: Array<string> = [];  // List of previus generated ids
const generateHTMLID = (): string => {
	getHTMLID.push(htmlID.next().value); // Get next id
	return getHTMLID.slice(-1)[0];
}

// Handle for clicking on search bar with dropdown menu
const handleMouseDown = (dropdown: boolean, createTag?:createTagType, tags?:TagType[]) => (evt: React.MouseEvent) => {
	const child = evt.target as HTMLDivElement;
	if(child.parentElement) {
		const parent = child.parentElement;
		parent.classList.remove("open");
		const elem = document.getElementById(parent.dataset['for'] as string) as HTMLInputElement;
		if(!elem) return;
		elem.value = child.innerHTML;
		elem.classList.remove("open");
		if(!dropdown && createTag && tags) {
			const ke: KeyboardEventWithDataReact<HTMLDivElement> = (new KeyboardEvent('keydown', {key: ','})) as never; //There is no KeyboardEvent with constructor in react, but using 'any' ts magically allows it
			ke.data = elem;
			handleKeyDown(createTag, tags)(ke);
		}
	}
}

interface SearchProps {
	taglist?: boolean;
	decription: string;
	type?: string;
	datalist?: Array<string>;
	toggleable?: boolean;
}

type createTagType = React.Dispatch<React.SetStateAction<{
	name: string;
	type: string;
}[]>>;

interface TagType {
	name: string;
	type: string;
}

// Creates a search-bar, either with or without tags
function Search(props: SearchProps) {
	const { taglist, decription, type, datalist, toggleable } = props;
	const dropdown = type==="dropdown";
	const [tags, createTag] = useState([{name:'',type:''}]);
	if(tags[0] && tags[0].name === '') tags.pop();
	return (
		<div className={"search "+(taglist ? "tags":"")}>
			<div className={"bar "+type||''}>
				<input
					id={generateHTMLID()}
					onClick={toggleDropdown()}
					onBlur={toggleDropdown(false)}
					onChange={(evt:React.ChangeEvent)=>evt.preventDefault()}
					onKeyDown={taglist ? handleKeyDown(createTag, tags):noOnkey}
					placeholder={decription}
					list={datalist?varToString(datalist):''}/>
				{datalist ?
					<div className="dropdown list" data-for={getHTMLID.slice(-1)[0]}>
						{datalist.map((v: string, i: number) => (<div key={i} onMouseDown={handleMouseDown(dropdown, createTag, tags)}>{v}</div>))}
					</div>
				: ''}
				<label htmlFor={getHTMLID.slice(-1)[0]} onClick={type!=="dropdown"?handleSubmit:noOnclick}></label>
			</div>
			{taglist ? <div className="tags list">
				{tags.length > 0 ? tags.map((v, i) => (<Tag key={i} name={v.name} type={v.type} toggleable={toggleable} />)) : ''}
			</div>: ''}
		</div>
	);
}

interface MultipleChoiceProps {
	decription: string,
	name: string,
}

// Creates a checkbox
export function MultipleChoice(props: MultipleChoiceProps) {
	const {decription, name} = props;
	return (
		<><input type="checkbox" id={name} /><label htmlFor={name}>{decription}</label></>
	);
}

// Create a list with weekdays name - formatted as length, case, and index-day
const weekdaysNamesArr = (len = 2, uppercase = true, offset = 1) => {
	const days = [
		'monday',
		'tuesday',
		'wendsday',
		'thursday',
		'friday',
		'saturday',
		'sunday',
	];
	const parsed = Array(7);

	if (offset < 0) offset = (7 - Math.abs(offset)) % 7;
	days.forEach((v, i) => {
		parsed[(i + offset) % 7] = uppercase ? v.toUpperCase() : v;
		parsed[(i + offset) % 7] = parsed[(i + offset) % 7].slice(0, len);
	});

	return parsed;
};

type WeekdaysType = number|string|null;
// Rotate-right a list
const weekdaysAvailArr = (arr: WeekdaysType[], offset: number) => {
	arr.forEach((v: WeekdaysType, i: number) => {
		arr[((i + offset) % 7) + 7] = arr[i];
		if (i === 6) {
			for (let i = 0; i < 7; i++) arr[i] = arr[i + 7];
			arr = arr.slice(7);
		}
	});
	return arr;
};

// Convert short meal-format to long
const fullMeal = (short: string | null) => {
	switch (short) {
		case 'A':   return 'Appetiser';
		case 'M':   return 'Main';
		case 'D':   return 'Desert';
		case 'AM':  return 'Appetiser + Main';
		case 'AD':  return 'Appetiser + Desert';
		case 'MD':  return 'Main + Desert';
		case 'AMD': return 'Appetiser + Main + Desert';
		default:    return 'Choose';
	}
};

interface WeekdaysProps {
	decription: string;
	offset?: number;
	namelength?: number;
	uppercase?: boolean;
}

// Handle to toggle weekday selection
const handleWeekSelection = (evt: React.MouseEvent<HTMLDivElement>) => {
	const elem = evt.target as HTMLDivElement;
	if(!elem.classList.contains("unavailable")) {
		const old = elem.classList.contains("available") ? "available" : "selected"
		elem.classList.remove(old);
		elem.classList.add(old==="available" ? "selected" : "available");
		const distantSibling = document.getElementsByClassName(elem.id)[0] as HTMLElement;
		if(distantSibling) {
			if(old==="available") {
				distantSibling.classList.remove("unavailable");
				(distantSibling.children[1] as HTMLInputElement).disabled = false;
			} else {
				distantSibling.classList.add("unavailable");
				(distantSibling.children[1] as HTMLInputElement).disabled = true;
			}
		}
	}
}

// Creates the weekday button selection
export function WeekdaysButtons(props: WeekdaysProps) {
	const { decription, namelength, uppercase, offset } = {
		namelength: 2,
		uppercase: true,
		offset: 1,
		...props,
	};
	const days = weekdaysNamesArr(namelength, uppercase, offset);
	const selected = weekdaysAvailArr(
		[-1, 1, 1, 0, 0, 1, 1],
		offset
	); /* Fetch from database */

	selected.forEach((v: WeekdaysType, i: number) => {
		switch (v) {
			case -1: selected[i] = 'unavailable'; break;
			case 0: selected[i] = 'available'; break;
			case 1: selected[i] = 'selected'; break;
			default: selected[i] = '';
		}
	});

	return (
		<div className="selection weekdays">
			<p>{decription}</p>
			<div className="week">
				{days.map((v: string, index: number) => (
					<div key={index} id={generateHTMLID()} className={'day ' + selected[index]} onClick={handleWeekSelection}>
						{v}
					</div>
				))}
			</div>
		</div>
	);
}

// Creates the weekday-dropdown
export function WeekdaysDropdown(props: WeekdaysProps) {
	const { decription, namelength, uppercase, offset } = {
		namelength: 2,
		uppercase: true,
		offset: 1,
		...props,
	};
	const days = weekdaysNamesArr(namelength, uppercase, offset);
	const selected = weekdaysAvailArr(
		[null, 'AM', 'D', null, null, 'AMD', 'M'],
		offset
	); /* Fetch from database */

	return (
		<div className="selection weekdays">
			<p>{decription}</p>
			<div className="week dropdowns">
				{days.map((v: string, index: number) => (
					<div
						key={index}
						className={'day ' + (getHTMLID.slice(index-7)[0]) + " " + (selected[index] ?? 'unavailable')}
					>
						<p>{v}</p>
						<select
							className="dropdownbox"
							disabled={!selected[index] ?? false}
							defaultValue={selected[index]??undefined}
						>
							{[null, 'A', 'M', 'D', 'AM', 'MD', 'AD', 'AMD'].map(
								(v: string | null, i) => (
									<option key={i} value={v ?? 0}>
										{(v ?? '').length} {fullMeal(v ?? '')}
									</option>
								)
							)}
						</select>
					</div>
				))}
			</div>
		</div>
	);
}

interface TextFieldProps {
	large?: boolean,
	decription?: string,
	placeholder?: string,
	submitBtnText?: string,
}

// Creates a textbox, that can be used as search or input
export function TextField(props: TextFieldProps) {
	const {large, placeholder, submitBtnText} = props;
	const decription = props.decription ? `${props.decription}` : null;
	if(large) return (
		<div className={"text field large"}>
			{ decription }
			<textarea placeholder={placeholder?placeholder:''}></textarea>
			{ submitBtnText ? <input value={submitBtnText} /> : null }
		</div>
	); else return (
		<div className={"text field"}>
			{ decription }
			<input type={"text"} placeholder={placeholder?placeholder:''}></input>
			{ submitBtnText ? <input value={submitBtnText} /> : null }
		</div>
	);
}

interface ButtonFieldProps {
	decription: string,
	vertical?: boolean,
	danger?: boolean
}

// Creates a area for buttons, to arrange them
class ButtonField extends Component<ButtonFieldProps> {
	override render() {
		const {decription, vertical, danger, children} = this.props;

		return (
			<div className={"button field "+(vertical?"vertical":"")}>
				{children}
				<input type={"button"} className={danger?"danger":""} value={decription} />
			</div>
		);
	}
}

interface StepProps {
	decs: string;
}

// Creates a list element for Guide
export function Step(props: StepProps) {
	const {decs} = props;
	return (
		<label className={"step cc"}>
			<input type="checkbox" />
			<span className="mark"></span>
			<p>{decs}</p>
		</label>
	);
}

interface GuideProps {
	title: string;
}

// Creates a list to hold Steps
class Guide extends Component<GuideProps> {
	override render() {
		const {title, children} = this.props;

		return (
			<div className={"guide"}>
				<h3>{title}</h3>
				{children}
			</div>
		);
	}
}

interface SelectionAreaProps {
	cln?: string;
	columns: number;
}

// Creates the box around buttons/search/other selections
class SelectionArea extends Component<SelectionAreaProps> {
	override render() {
		const { cln, columns, children } = { cln: null, ...this.props };
		return (
			<div
				className={'selectionarea ' + (cln ?? ' ')}
				data-columns={columns}
			>
				{children}
			</div>
		);
	}
}

export default SelectionArea;
export { Listing, Guide, Search, ButtonField };
