import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import {
	faCircleCheck,
	faCircleExclamation,
	faCircleInfo,
	faCircleXmark,
	IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
	InputTranslations,
	InputValidationAttributes,
	InputValidator,
} from './model/field';

export type InputTypes =
	| 'color'
	| 'date'
	| 'datetime-local'
	| 'email'
	| 'month'
	| 'number'
	| 'password'
	| 'search'
	| 'tel'
	| 'text'
	| 'time'
	| 'url'
	| 'week';

@Component({
	selector: 'mt-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.scss'],
})
export class FieldComponent implements OnInit, AfterViewInit {
	hasFocus = false;
	faError = faCircleExclamation;
	faValid = faCircleCheck;
	faClear = faCircleXmark;

	showClearIcon = false;

	// viewchild
	@ViewChild('inputField') inputField: ElementRef;

	@Input() public disabled = false;

	/**

     * value of the field

     */

	_value = '';

	public get value() {
		return this._value;
	}

	@Input()
	public set value(value: string) {
		this._value = value;

		this.checkValidators(value);
	}

	@Input() public defaultIcon = faCircleInfo;

	@Input() public label = 'Label';

	@Input() public helperText = 'Helper text';

	@Input() public placeholder = 'Placeholder';

	/**

     * readonly attribute

     */

	@Input()
	readOnly = false;

	@Input() public type: InputTypes = 'text';

	/**

     * list of validators to check input against

     *   A validator is a method that takes in an input string

     *   and returns an error message string if the input is not valid

     *   OR null if the input is valid.

     */

	@Input()
	validators: InputValidator[] = [];

	/**

     * obj of native validation methods to check input against

  */

	@Input()
	validation: InputValidationAttributes = { required: false, typeCheck: false };

	/**

     * whether the field is valid or not

     */

	@Input()
	valid = true;

	/**

     * size for the input field

     */

	@Input()
	width = null;

	/**

     * unit placeholder

     */

	@Input()
	unit: string;

	/**
	 * 
	 * translations
	
	*/

	@Input()
	translations: InputTranslations = {};

	/**

     * on input field valid change event listener

     */

	@Output() validChanged: EventEmitter<boolean> = new EventEmitter();

	/**

     * on input field value change event listener

     */

	@Output() valueChanged: EventEmitter<number | string> = new EventEmitter();

	/**

     * on input field blur event listener

     */

	@Output() blurred: EventEmitter<Event> = new EventEmitter();

	/**

     * on input field focus event listener

     */

	@Output() focused: EventEmitter<Event> = new EventEmitter();

	/**

     * currently displayed message text below input box

     */

	currentMessage = '';

	ngOnInit() {
		this.checkValidators(this.value);
	}

	ngAfterViewInit(): void {
		this.checkValidators(this.value);
	}

	onFocus(e: Event) {
		this.hasFocus = true;

		this.focused.emit(e);
	}

	onBlur(e: Event) {
		this.hasFocus = false;
		this.checkValidators(this.value);

		this.blurred.emit(e);
	}

	onInput(event: Event) {
		const target = event.target as HTMLInputElement;
		this.value = target.value;
		this.showClearIcon = (this.value || '').length > 0;
		this.valueChanged.emit(target.value);
	}

	onChange(event: Event) {
		const target = event.target as HTMLInputElement;
		this.valueChanged.emit(target.value);
	}

	checkValueMissing(valueMissing: boolean) {
		if (this.validation.required && valueMissing) {
			this.currentMessage =
				this.translations?.requiredValidationMessage ||
				'required text is missing';
		}
	}

	checkMaxLength(tooLong: boolean) {
		if (this.validation.maxLength && tooLong) {
			this.currentMessage =
				this.translations?.tooLongMessage || 'too long text is missing';
		}
	}

	checkMinLength(tooShort: boolean) {
		if (this.validation.minLength && tooShort) {
			this.currentMessage =
				this.translations?.tooShortMessage || 'too short text is missing';
		}
	}

	checkTypeMismatch(typeMismatch: boolean) {
		if (this.validation.typeCheck && typeMismatch) {
			this.currentMessage =
				this.translations?.typeMismatchMessage ||
				'type mismatch text is missing';
		}
	}

	checkPatternMismatch(patternMismatch: boolean) {
		if (this.validation.pattern && patternMismatch) {
			this.currentMessage =
				this.translations?.patternMismatchMessage ||
				'pattern mismatch text is missing';
		}
	}

	checkValidity(): boolean {
		let valid = true;

		const elementValidity = this.inputField?.nativeElement?.validity;

		if (elementValidity && !elementValidity.valid) {
			const { valueMissing, tooLong, tooShort, typeMismatch, patternMismatch } =
				elementValidity;

			valid = false;

			// Required

			this.checkValueMissing(valueMissing);

			// maxLength

			this.checkMaxLength(tooLong);

			// minLength

			this.checkMinLength(tooShort);

			// type mismatch (email)

			this.checkTypeMismatch(typeMismatch);

			// pattern mismatch (regex)

			this.checkPatternMismatch(patternMismatch);
		}

		return valid;
	}

	/**

     * validate input and set error message based on validators

     */

	checkValidators(value?: string | number): boolean {
		let valid = true;

		// fn validations is highest priority and will on

		for (const validator of this.validators) {
			const errorMessage = validator(value || this.value);

			if (errorMessage) {
				valid = false;

				this.currentMessage = errorMessage;
			}
		}

		// check for native validity

		if (valid) {
			valid = this.checkValidity();
		}

		if (valid !== this.valid) {
			this.valid = valid;

			this.validChanged.emit(valid);
		}

		if (valid) {
			this.currentMessage = this.helperText;
		}

		return valid;
	}

	/**

     * clear the value of the input field

     * @param e clickEvent

     */

	clearValue(e?: Event): void {
		e?.preventDefault();

		this.inputField.nativeElement.value = '';

		this.value = '';

		this.showClearIcon = false;

		this.valueChanged.emit(this.value);
	}

	/**

     * this function is called on label click which means any click that happened

     * inside the label was propagated to the label and any click that

     * happens inside the label should not remove the focus from the label

     * for that reason we need to force focus on the input field

     * @returns {boolean}

     */

	checkFocus() {
		this.focusInput();

		return false;
	}

	/**

     * A way to call focus on the input field

     */
	focusInput() {
		this.inputField.nativeElement.focus();
	}

	currentIcon(): IconDefinition {
		if (!this.valid) {
			return this.faError;
		} else if (this.valid) {
			return this.faValid;
		} else if (!this.disabled) {
			return this.defaultIcon;
		}

		return this.faError;
	}
}
